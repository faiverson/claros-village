'use server'

import {
    addSumReservation,
    destroySumReservation,
    getExistSumReservation,
    getGymReservations,
    getSoccerReservations,
    getSumReservation,
    getSumReservations,
} from '@/app/db/reservation'
import { ReservationDBSchema } from '@/app/schemas'
import { auth } from '@/src/auth'
import { Amenity } from '@/utils/types'
import { z } from 'zod'

export default async function addReservation(data: z.infer<typeof ReservationDBSchema>) {
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
        case Amenity.Sum: {
            const sumData = {
                shift,
                dateAt: new Date(date_at),
                observation,
                rooms,
                userId,
            }

            const existReservation = await getExistSumReservation(sumData)

            if (existReservation) {
                return { error: true, key: 'reservation_exist' }
            }

            newReservation = await addSumReservation(sumData)
            break
        }

        default:
            break
    }

    return { success: true, data: newReservation }
}

export async function destroyReservation(id: string) {
    const session = await auth()
    const userId = session?.user.id
    if (!userId) {
        return { error: true, key: 'invalid_session' }
    }

    const reservation = await getSumReservation(id)
    if (!reservation) {
        return { error: true, key: 'not_found' }
    }

    if (reservation.userId !== userId) {
        return { error: true, key: 'no_permission' }
    }

    await destroySumReservation(id)

    return { success: true }
}

export async function getReservations() {
    const [sum, gym, soccer] = await Promise.all([getSumReservations(), getGymReservations(), getSoccerReservations()])

    return { sum, gym, soccer }
}

export async function getMyReservations() {
    const session = await auth()
    const userId = session?.user.id
    if (!userId) {
        return { error: true, key: 'invalid_session' }
    }

    const [sum, gym, soccer] = await Promise.all([getSumReservations({ userId }), getGymReservations(), getSoccerReservations()])

    return { sum, gym, soccer }
}
