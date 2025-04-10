'use server'

import { Role } from '@prisma/client'
import { getServerSession } from 'next-auth'

import { checkServerPermission } from '@/hooks/useServerPermission'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

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

    const formattedUsers = users.map((user) => ({
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

export async function getUsers() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return { error: 'Unauthorized' }
    }

    if (session.user.role !== Role.ADMIN && session.user.role !== Role.MANAGER) {
      return { error: 'Forbidden' }
    }

    const users = await prisma.user.findMany({
      where: {
        id: {
          not: session.user.id,
        },
      },
      orderBy: {
        name: 'asc',
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

    const formattedUsers = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      active: user.active,
      emailVerified: user.emailVerified,
      unidad: user.residents?.[0]?.resident?.unidad || null,
    }))

    return { data: formattedUsers }
  } catch (error) {
    console.error('Error fetching users:', error)
    return { error: 'Internal Server Error' }
  }
}

export async function getUserById(id: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return { error: 'Unauthorized' }
  }

  const canEdit = await checkServerPermission([Role.ADMIN, Role.MANAGER])
  if (!canEdit) {
    return { error: 'Forbidden' }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
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

    if (!user) {
      return { error: 'User not found' }
    }

    // Format the data to match UserForm expectations
    const formattedUser = {
      id: user.id || '',
      name: user.name || '',
      email: user.email,
      role: user.role,
      phone: user.phone || undefined,
      unidad: user.residents?.[0]?.resident?.unidad || undefined,
      active: user.active,
    }

    return { data: formattedUser }
  } catch (error) {
    console.error('Error fetching user:', error)
    return { error: 'Failed to fetch user' }
  }
}
