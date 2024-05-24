import { createUserToken } from '@/app/user'
import { RegisterTemplate } from '@/utils/templates/register-email'
import { getTranslations } from 'next-intl/server'
import { Resend } from 'resend'

export default async function sendVerificationEmail(user: any) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  const t = await getTranslations('Emails')
  try {
    const hash = await createUserToken(user.id)

    return await resend.emails.send({
      from: 'no-reply <no-reply@resend.dev>',
      // from: 'no-reply <no-reply@mbox.clarosvillage.org.ar>',
      to: ['fabian.torres@clarosvillage.org.ar'],
      subject: t('verify'),
      react: RegisterTemplate(user, hash.token),
    })
  } catch (error) {
    throw new Error('Error sending email')
  }
}
