import { Role } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { getHashedPassword } from '@/lib/utils/password'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== Role.ADMIN && session.user.role !== Role.MANAGER) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params
    const body = await request.json()
    const { name, email, phone, password, role, unidad, active } = body

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    })

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if email is being changed and if it's already taken
    if (email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email },
      })

      if (emailExists) {
        return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
      }
    }

    // Find resident by unidad if role is RENTER or LANDLORD
    let resident = null
    if (unidad && (role === Role.RENTER || role === Role.LANDLORD)) {
      resident = await prisma.resident.findFirst({
        where: { unidad },
      })

      if (!resident) {
        return NextResponse.json({ error: 'Unit not found' }, { status: 400 })
      }
    }

    // Prepare update data
    const updateData: {
      name: string
      email: string
      phone?: string
      role: Role
      password?: string
      active: boolean
      emailVerified?: Date
    } = {
      name,
      email,
      phone,
      role,
      active,
    }

    // Only update password if provided
    if (password) {
      updateData.password = await getHashedPassword(password)
    }

    // Set emailVerified to today if user is being activated and hasn't been verified
    if (active && !existingUser.emailVerified) {
      updateData.emailVerified = new Date()
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
                unidad: true,
              },
            },
          },
        },
      },
    })

    // Handle resident relationship
    if (resident) {
      // Delete existing resident relationship
      await prisma.userResident.deleteMany({
        where: { userId: id },
      })

      // Create new resident relationship
      await prisma.userResident.create({
        data: {
          userId: id,
          residentId: resident.id,
        },
      })
    }

    return NextResponse.json({
      ...updatedUser,
      password: undefined,
      unidad: updatedUser.residents[0]?.resident?.unidad || null,
    })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
