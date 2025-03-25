import { compare } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function authorize(credentials: any) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
    });

    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    if (!user.active) {
      throw new Error('Tu cuenta no está activa. Por favor verifica tu correo electrónico.');
    }

    if (!user.emailVerified) {
      throw new Error('Por favor verifica tu correo electrónico antes de iniciar sesión.');
    }

    const isValid = await compare(credentials.password, user.password!);

    if (!isValid) {
      throw new Error('Credenciales inválidas');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  } catch (error) {
    throw error;
  }
}
