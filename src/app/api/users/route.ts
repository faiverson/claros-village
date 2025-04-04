import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getHashedPassword } from '@/lib/utils/password';
import { Role } from '@prisma/client';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        emailVerified: true,
        phone: true,
        residents: {
          select: {
            resident: {
              select: {
                unidad: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const transformedUsers = users.map(user => {
      const resident = user.residents?.[0]?.resident;
      return {
        ...user,
        unidad: resident?.unidad || null,
      };
    });

    return NextResponse.json(transformedUsers || []);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    const { user } = session;

    if (user.role !== Role.ADMIN && user.role !== Role.MANAGER) {
      return NextResponse.json({ message: 'No tienes permisos para realizar esta acción' }, { status: 403 });
    }

    const body = await request.json();
    const { name, email, phone, password, role, unidad } = body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'El email ya está registrado' }, { status: 400 });
    }

    // Find resident by unidad
    const resident = await prisma.resident.findFirst({
      where: { unidad },
    });

    if (!resident && (role === Role.RENTER || role === Role.LANDLORD)) {
      return NextResponse.json({ message: 'No se encontró la unidad especificada' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await getHashedPassword(password);

    // Create user with resident connection
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role,
        active: true,
        residents: resident ? {
          create: {
            residentId: resident.id
          }
        } : undefined
      },
      include: {
        residents: {
          include: {
            resident: {
              select: {
                unidad: true
              }
            }
          }
        }
      }
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      ...userWithoutPassword,
      unidad: newUser.residents[0]?.resident.unidad || null
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Error al crear el usuario' }, { status: 500 });
  }
}
