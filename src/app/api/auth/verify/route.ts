import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { message: 'Token de verificación no proporcionado' },
        { status: 400 }
      );
    }

    // Find user with valid token
    const user = await prisma.user.findFirst({
      where: {
        verificationToken: token,
        verificationExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Token de verificación inválido o expirado' },
        { status: 400 }
      );
    }

    // Update user to active, set emailVerified, and clear verification fields
    await prisma.user.update({
      where: { id: user.id },
      data: {
        active: true,
        emailVerified: new Date(),
        verificationToken: null,
        verificationExpires: null,
      },
    });

    return NextResponse.json(
      { message: 'Cuenta verificada exitosamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { message: 'Error al verificar la cuenta' },
      { status: 500 }
    );
  }
}
