'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
import { Role } from '@prisma/client'

export async function getResidentUsers() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return { error: 'Unauthorized' }
    }

    if (session.user.role !== Role.ADMIN) {
      return { error: 'Forbidden' }
    }

    const users = await prisma.user.findMany({
      where: {
        role: {
          in: [Role.RENTER, Role.LANDLORD],
        },
      },
      select: {
        id: true,
        name: true,
        residents: {
          select: {
            resident: {
              select: {
                unidad: true,
              },
            },
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })

    const formattedUsers = users.map(user => ({
      id: user.id,
      name: user.name,
      unidad: user.residents?.[0]?.resident?.unidad || null,
    }))

    return { data: formattedUsers }
  } catch (error) {
    console.error('Error fetching users:', error)
    return { error: 'Internal Server Error' }
  }
}
