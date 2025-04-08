import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { Role } from '@prisma/client';
import { getHashedPassword } from '@/lib/utils/password';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role !== Role.ADMIN && session.user.role !== Role.MANAGER) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = params;
    const body = await request.json();
    const { name, email, phone, password, role, unidad } = body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if email is being changed and if it's already taken
    if (email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email },
      });

      if (emailExists) {
        return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
      }
    }

    // Find resident by unidad if role is RENTER or LANDLORD
    let resident = null;
    if (unidad && (role === Role.RENTER || role === Role.LANDLORD)) {
      resident = await prisma.resident.findFirst({
        where: { unidad },
      });

      if (!resident) {
        return NextResponse.json({ error: 'Unit not found' }, { status: 400 });
      }
    }

    // Prepare update data
    const updateData: {
      name: string;
      email: string;
      phone?: string;
      role: Role;
      password?: string;
    } = {
      name,
      email,
      phone,
      role,
    };

    // Only update password if provided
    if (password) {
      updateData.password = await getHashedPassword(password);
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
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

    // Handle resident relationship
    if (resident) {
      // Delete existing resident relationship
      await prisma.userResident.deleteMany({
        where: { userId: id }
      });

      // Create new resident relationship
      await prisma.userResident.create({
        data: {
          userId: id,
          residentId: resident.id
        }
      });
    }

    return NextResponse.json({
      ...updatedUser,
      password: undefined,
      unidad: updatedUser.residents[0]?.resident?.unidad || null
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
