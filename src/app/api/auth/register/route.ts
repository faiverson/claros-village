import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { randomBytes } from 'crypto';
import { sendVerificationEmail } from '@/lib/email';
import { Role, User, VerificationTokenType } from '@prisma/client';
import { getHashedPassword } from '@/lib/utils/password';

async function createVerificationToken(userId: string) {
  const token = randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  await prisma.verificationToken.create({
    data: {
      identifier: userId,
      token,
      expires,
      type: VerificationTokenType.REGISTER
    },
  });

  return token;
}

async function sendVerificationEmailToUser(email: string, name: string, token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`;
  await sendVerificationEmail(email, name, verificationUrl);
}

async function handleInactiveUser(user: User, email: string, name: string) {
  console.log('User exists but is not verified, sending new verification email...');
  const token = await createVerificationToken(user.id);
  await sendVerificationEmailToUser(email, name, token);
  console.log('New verification email sent');

  return NextResponse.json(
    {
      message: 'Se ha enviado un nuevo correo de verificación.',
      user
    },
    { status: 200 }
  );
}

async function createNewUser(email: string, password: string, name: string, role: Role, phone: string, residentId: string, active: boolean = false) {
  const hashedPassword = await getHashedPassword(password);

  const userData = {
    email,
    name,
    password: hashedPassword,
    role,
    active,
    phone,
    residents: {
      create: {
        residentId
      }
    }
  };

  const user = await prisma.user.create({
    data: userData,
  });

  const token = await createVerificationToken(user.id);
  await sendVerificationEmailToUser(email, name, token);
  return user;
}

export async function POST(req: Request) {
  try {
    const { email, password, name, role, unidad, phone } = await req.json();

    // Validate input
    if (!email || !password || !name || !role || !unidad || !phone) {
      return NextResponse.json(
        { message: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      if (!existingUser.active) {
        return handleInactiveUser(existingUser, email, name);
      }

      return NextResponse.json(
        { message: 'El usuario ya existe' },
        { status: 400 }
      );
    }

    // Find resident by unidad
    const existingResident = await prisma.resident.findUnique({
      where: { unidad }
    });

    if (!existingResident) {
      return NextResponse.json(
        { message: 'No se encontró la unidad especificada' },
        { status: 400 }
      );
    }

    // Check if email is in email_owners array
    const isOwner = existingResident.email_owners.includes(email);

    const user = await createNewUser(
      email,
      password,
      name,
      role,
      phone,
      existingResident.id,
      isOwner
    );

    return NextResponse.json(
      {
        message: 'Para finalizar el registro, por favor verifica tu correo electrónico',
        user
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Error al crear el usuario' },
      { status: 500 }
    );
  }
}
