import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { VerificationTokenType } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { message: 'Token de verificación no proporcionado' },
        { status: 400 }
      );
    }

    // Find the verification token and check if it's valid and not expired
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        token,
        type: VerificationTokenType.REGISTER
      },
    });

    if (!verificationToken) {
      return NextResponse.json(
        { message: 'Token de verificación inválido o expirado' },
        { status: 400 }
      );
    }

    // Get the user associated with this token
    const user = await prisma.user.findUnique({
      where: {
        id: verificationToken.identifier,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    try {
      await prisma.$transaction(async (tx) => {
        try {
          await tx.user.update({
            where: { id: user.id },
            data: {
              emailVerified: new Date(),
              active: true,
            },
          });

          await tx.verificationToken.delete({
            where: {
              identifier_token: {
                identifier: user.id,
                token: verificationToken.token,
              },
            },
          });
        } catch (error) {
          console.error('Error during transaction operations:', error);
          throw error;
        }
      });

      // Return success response
      return NextResponse.json({ message: 'Email verificado exitosamente'}, { status: 200 });

    } catch (transactionError) {
      console.error('Error in transaction:', transactionError);
      return NextResponse.json(
        { message: 'Error al actualizar el estado del usuario' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error verifying email:', error);
    return NextResponse.json(
      { message: 'Error al verificar el email' },
      { status: 500 }
    );
  }
}
