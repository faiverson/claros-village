'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/prisma'

export async function submitContactForm(formData: { name: string; email: string; phone: string; message: string }) {
  try {
    await prisma.contactSubmission.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      },
    })

    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return { success: false, error: 'Failed to submit form' }
  }
}
