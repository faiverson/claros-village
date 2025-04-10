import { RegisterForm } from '@/components/auth/register/RegisterForm'
import { prisma } from '@/lib/prisma'

async function getUnits() {
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
}

export default async function Register() {
  const units = await getUnits()

  return <RegisterForm units={units} />
}
