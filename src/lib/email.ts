import { Resend } from 'resend'

// Initialize Resend with proper environment variable handling
console.debug('RESEND_API_KEY', process.env.RESEND_API_KEY)
const resend = new Resend(process.env.RESEND_API_KEY)

interface ResendError {
  message: string
  name?: string
  stack?: string
}

export async function sendVerificationEmail(email: string, name: string, verificationUrl: string) {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not defined')
    }

    if (!process.env.RESEND_FROM_EMAIL) {
      throw new Error('RESEND_FROM_EMAIL is not defined')
    }

    console.log('Starting email sending process...')
    console.log('Email parameters:', {
      to: email,
      name,
      verificationUrl,
    })

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: email,
      subject: 'Verifica tu cuenta - Claros Village',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Verifica tu cuenta</h2>
          <p>Hola ${name},</p>
          <p>Gracias por registrarte en Claros Village. Para activar tu cuenta, por favor haz clic en el siguiente enlace:</p>
          <p style="margin: 30px 0;">
            <a href="${verificationUrl}"
               style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
              Verificar cuenta
            </a>
          </p>
          <p>Este enlace expirará en 24 horas.</p>
          <p>Si no solicitaste esta verificación, por favor ignora este correo.</p>
        </div>
      `,
    })

    if (error) {
      console.error('Email sending error:', {
        error,
        errorMessage: error.message,
        errorName: error.name,
      })
      throw error
    }

    return true
  } catch (error: unknown) {
    const resendError = error as ResendError
    console.error('Detailed email sending error:', {
      error: resendError.message,
      name: resendError.name,
      stack: resendError.stack,
    })
    throw error
  }
}
