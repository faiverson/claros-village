'use server'

import {
  addSumReservation,
  getExistReservation,
  getSumReservations,
} from '@/app/db/reservation'
import { ReservationDBSchema } from '@/app/schemas'
import { auth } from '@/src/auth'
import { Amenity } from '@/utils/types'
import { z } from 'zod'

export default async function addReservation(
  data: z.infer<typeof ReservationDBSchema>,
) {
  const session = await auth()
  const userId = session?.user.id
  if (!userId) {
    return { error: true, key: 'invalid_session' }
  }

  const validatedFields = ReservationDBSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: true, key: 'invalid_reservation' }
  }

  const { amenity, shift, date_at, rooms, observation } = data

  let newReservation
  switch (amenity) {
    case Amenity.Sum:
      let sumData = {
        shift,
        dateAt: new Date(date_at),
        observation,
        rooms,
        userId,
      }

      const existReservation = await getExistReservation(sumData)

      if (existReservation) {
        return { error: true, key: 'reservation_exist' }
      }

      newReservation = await addSumReservation(sumData)
      break

    default:
      break
  }

  return { success: true, data: newReservation }
}

export async function getReservations() {
  const sum = await getSumReservations()
  const gym = []
  const soccer = []

  return { sum, gym, soccer }
}
