import { PrismaClient } from '@prisma/client'
import { FileResident } from '@/utils/types/resident'
import fs from 'fs'

const prisma = new PrismaClient()

export async function seedResidents() {
  // Truncate tables in correct order
  await prisma.$executeRaw`TRUNCATE TABLE users_residents CASCADE;`
  await prisma.$executeRaw`TRUNCATE TABLE residents CASCADE;`

  const residents: FileResident[] = JSON.parse(
    fs.readFileSync('static/privates/residents.json', 'utf8'),
  )

  console.log(`Total Residents: ${residents.length}`)
  for (const resident of residents) {
    console.log(`Resident: ${resident.email}`)
    const res = await prisma.resident.upsert({
      where: { unidad: resident.unidad },
      update: {
        email: resident.email,
        lote: resident.lote,
        name: resident.nombre,
        email_owners: resident.email_propietario,
        email_expenses: Array.isArray(resident.email_expensas)
          ? resident.email_expensas
          : [resident.email_expensas],
        manzana: resident.manzana,
        phone: resident.telefono,
        phones: resident.telefonos,
        is_owner: resident.propietario,
        is_duplex: /[AB]/.test(resident.lote),
        numero_expensas: resident.numero_expensas,
        direccion: resident.direccion,
        floor: resident.piso,
        department: resident.departamento,
        neighborhood: resident.barrio,
      },
      create: {
        email: resident.email,
        lote: resident.lote,
        unidad: resident.unidad,
        name: resident.nombre,
        email_owners: resident.email_propietario,
        email_expenses: Array.isArray(resident.email_expensas)
          ? resident.email_expensas
          : [resident.email_expensas],
        manzana: resident.manzana,
        phone: resident.telefono,
        phones: resident.telefonos,
        is_owner: resident.propietario,
        is_duplex: /[AB]/.test(resident.lote),
        numero_expensas: resident.numero_expensas,
        direccion: resident.direccion,
        floor: resident.piso,
        department: resident.departamento,
        neighborhood: resident.barrio,
      },
    })

    console.log(`Resident: ${resident.email} - ${res.id} stored`)
  }
}
