import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET() {
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

    return NextResponse.json(units.map((unit) => unit.unidad))
  } catch (error) {
    console.error('Error fetching units:', error)
    return NextResponse.json({ error: 'Error fetching units' }, { status: 500 })
  }
}
