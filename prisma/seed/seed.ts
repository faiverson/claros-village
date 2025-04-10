import { PrismaClient } from '@prisma/client'

import { seedResidents } from './residents/seed.js'
import { seedUsers } from './users/seed.js'

const prisma = new PrismaClient()

async function main() {
  // Get command line arguments
  const args = process.argv.slice(2)
  const entities = args.length > 0 ? args : ['users', 'residents']

  for (const entity of entities) {
    switch (entity) {
      case 'users':
        await seedUsers()
        break
      case 'residents':
        await seedResidents()
        break
      default:
        console.warn(`Unknown entity: ${entity}`)
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
