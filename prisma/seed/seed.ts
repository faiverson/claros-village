import { PrismaClient, Role } from '@prisma/client'
import * as argon2 from 'argon2'
import fs from 'fs'

const prisma = new PrismaClient()

type FileResident = {
  id: string
  nombre: string
  email: string
  email_propietario: string[]
  email_expensas: string[] | string
  manzana: string
  lote: string
  unidad: string
  phone: string
  telefono: string
  telefonos: string[]
  numero_expensas: string
  direccion: string
  piso: string
  departamento: string
  barrio: string
  propietario: boolean
  createdAt: Date
}

type FileUser = {
  name: string
  email: string
  role: Role
}

async function main() {
  const residents: FileResident[] = JSON.parse(
    fs.readFileSync('static/privates/residents.json', 'utf8'),
  )
  const users: FileUser[] = JSON.parse(
    fs.readFileSync('static/privates/users.json', 'utf8'),
  )

  for (const resident of residents) {
    const res = await prisma.resident.upsert({
      where: { email: resident.email },
      update: {},
      create: {
        email: resident.email,
        name: resident.nombre,
        email_owners: resident.email_propietario,
        email_expenses: Array.isArray(resident.email_expensas)
          ? resident.email_expensas
          : [resident.email_expensas],
        manzana: resident.manzana,
        lote: resident.lote,
        unidad: resident.unidad,
        phone: resident.telefono,
        phones: resident.telefonos,
        is_owner: resident.propietario,
        is_duplex: /[AB]/.test(resident.lote),
        numero_expensas: resident.numero_expensas,
        direccion: resident.direccion,
        floor: resident.piso,
        departament: resident.departamento,
        neighborhood: resident.barrio,
      },
    })

    console.log(res)
  }

  const currentDate = new Date()

  for (const user of users) {
    const hashedPassword = await argon2.hash('Pa$$w0rd!!')
    await prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
        active: true,
        emailVerified: currentDate.toISOString(),
      },
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
