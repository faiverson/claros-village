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
  console.log('User exists but is not active, sending new verification email...');
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

async function createNewUser(email: string, password: string, name: string, role: Role, residentId: string) {
  const hashedPassword = await getHashedPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role,
      active: false,
      residents: {
        create: {
          residentId
        }
      }
    },
  });

  const token = await createVerificationToken(user.id);
  await sendVerificationEmailToUser(email, name, token);
  console.log('Verification email sent');

  return user;
}

export async function POST(req: Request) {
  try {
    const { email, password, name, role, unidad } = await req.json();
    // const { email, password, name, role, unidad } = {email: 'fa.iverson@gmail.com', password: 'P@ssw0rd!!', name: 'Fabian Iverson', role: Role.LANDLORD, unidad: 'M31 L39'};
    console.log('Registration data:', { email, name, role, unidad });

    // Validate input
    if (!email || !password || !name || !role || !unidad) {
      return NextResponse.json(
        { message: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    // Check if email exists in Resident table's email_owners array and matches the selected unit
    const existingResident = await prisma.resident.findFirst({
      where: {
        email_owners: {
          has: email
        },
        unidad: unidad
      }
    });
    console.log('existingResident:', existingResident);

    if (!existingResident) {
      console.log('No matching resident found for email and unit');
      return NextResponse.json(
        { message: 'No se encontró un propietario con el email y/o unidad proporcionado' },
        { status: 400 }
      );
    }

    if (existingUser) {
      if (!existingUser.active) {
        return handleInactiveUser(existingUser, email, name);
      }

      return NextResponse.json(
        { message: 'El usuario ya existe' },
        { status: 400 }
      );
    }

    const user = await createNewUser(email, password, name, role, existingResident!.id);

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
