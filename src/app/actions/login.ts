'use server'
import { PrismaClient } from "@prisma/client";
import type { Login } from "utils/types";

export async function login(data: Login) {
  const prisma = new PrismaClient();

  const existingUser = await prisma.resident.find({
    where: {
      OR: [
        {
          email: {
            equals: 'prisma.io',
          },
        },
        { email: { endsWith: 'gmail.com' } },
      ],


      email: data.email,
    },
  });


  console.log('server action login called', data);
  return "ok"
}
