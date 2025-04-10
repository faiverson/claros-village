import { Role } from '@prisma/client'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { getHashedPassword } from '@/lib/utils/password'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const users = await prisma.user.findMany({
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
    }

    const { user } = session

    if (user.role !== Role.ADMIN && user.role !== Role.MANAGER) {
      return NextResponse.json({ message: 'No tienes permisos para realizar esta acción' }, { status: 403 })
    }

    const body = await request.json()
    const { name, email, phone, password, role, unidad } = body

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ message: 'El email ya está registrado' }, { status: 400 })
    }

    // Find resident by unidad
    const resident = await prisma.resident.findFirst({
      where: { unidad },
    })

    if (!resident && (role === Role.RENTER || role === Role.LANDLORD)) {
      return NextResponse.json({ message: 'No se encontró la unidad especificada' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await getHashedPassword(password)

    const currentDate = new Date()

    // Create user with resident connection
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role,
        active: true,
        emailVerified: currentDate.toISOString(),
        residents: resident
          ? {
              create: {
                residentId: resident.id,
              },
            }
          : undefined,
      },
      include: {
        residents: {
          include: {
            resident: {
              select: {
                unidad: true,
              },
            },
          },
        },
      },
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      ...userWithoutPassword,
      unidad: newUser.residents[0]?.resident.unidad || null,
    })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ message: 'Error al crear el usuario' }, { status: 500 })
  }
}
