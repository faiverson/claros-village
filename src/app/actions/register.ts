'use server'
import { PrismaClient } from "@prisma/client";
import type { Register } from "utils/types";

export default async function signUp(formData: Register) {
  const prisma = new PrismaClient();

  const { email, name, password } = formData;

  const existingUser = await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  });

  if(existingUser) {
    return { error: true, key: 'user_exist'};
  }

  const existingResident = await prisma.resident.findFirst({
    where: {
      email_owners: {
        has: email,
      },
    },
  });

  if(existingResident) {
    const user = await prisma.user.create({
      data: {
        name: formData.name,
        email: formData.email,
        password: formData.password
      },
    });

    return {data: user, key: 'msg.user_created'};
  }

  return { error: true, key: 'resident_not_found'};
}
