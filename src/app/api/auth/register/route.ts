import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { randomBytes } from 'crypto';
import { sendVerificationEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { email, password, name, role } = await req.json();

    // Validate input
    if (!email || !password || !name || !role) {
      console.log('Missing required fields:', { email: !!email, password: !!password, name: !!name, role: !!role });
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
      return NextResponse.json(
        { message: 'El usuario ya existe' },
        { status: 400 }
      );
    }

    // Check if email exists in Resident table
    const existingResident = await prisma.resident.findUnique({
      where: { email },
    });

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Generate verification token
    const verificationToken = randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create user with active status based on resident check
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
        active: !!existingResident, // true if email exists in Resident table
        verificationToken: existingResident ? verificationToken : null,
        verificationExpires: existingResident ? verificationExpires : null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // If email exists in Resident table, send verification email
    if (existingResident) {
      const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${verificationToken}`;
      await sendVerificationEmail(email, name, verificationUrl);
    }

    return NextResponse.json(
      {
        message: existingResident
          ? 'Usuario creado. Por favor verifica tu correo electrónico.'
          : 'Usuario creado exitosamente',
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
