import { prisma } from '@/lib/prisma';
import { verifyPassword } from '@/lib/utils/password';

interface Credentials {
  email: string;
  password: string;
}

export async function authorize(credentials: Credentials) {
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

    const isValid = await verifyPassword(user.password!, credentials.password);

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
