'use server'

import prisma from '@/lib/prisma'

export async function getUnits() {
  try {
    const units = await prisma.resident.findMany({
      select: {
        unidad: true,
      },
      distinct: ['unidad'],
      orderBy: {
        unidad: 'asc',
      },
    })

    return units.map((unit) => unit.unidad)
  } catch (error) {
    console.error('Error fetching units:', error)
    return []
  }
}
