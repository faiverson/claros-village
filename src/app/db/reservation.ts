import prisma from '@/src/db'
import { SumRoom, SumShift } from '@/utils/types'

export interface GetReservationProps {
    shift: SumShift
    dateAt: Date
    userId: string
    rooms: SumRoom[]
    observation?: string | null
}

export const getExistSumReservation = async ({ dateAt, shift, rooms }: GetReservationProps) => {
    const roomConditions = rooms.reduce<Record<string, boolean>[]>((acc, room) => {
        if (room === SumRoom.Small) acc.push({ roomSmall: true })
        if (room === SumRoom.Big) acc.push({ roomBig: true })
        return acc
    }, [])

    return await prisma.sumReservation.findFirst({
        where: {
            AND: [
                { dateAt },
                ...(shift !== SumShift.Both
                    ? [
                          {
                              OR: [{ shift }, { shift: SumShift.Both }],
                          },
                      ]
                    : []),
                ...roomConditions,
            ],
        },
    })
}

export const addSumReservation = async ({ dateAt, shift, userId, rooms, observation }: GetReservationProps) => {
    return await prisma.sumReservation.create({
        data: {
            dateAt,
            shift,
            observation,
            roomBig: rooms.includes(SumRoom.Big),
            roomSmall: rooms.includes(SumRoom.Small),
            user: {
                connect: {
                    id: userId,
                },
            },
        },
    })
}

export const getSumReservation = (id: string) => {
    return prisma.sumReservation.findFirst({
        where: {
            id,
        },
    })
}
export const destroySumReservation = (id: string) => {
    return prisma.sumReservation.delete({
        where: {
            id,
        },
    })
}

export const getSumReservations = (options?: { userId: string }) => {
    const { userId } = options ?? { userId: null }
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const where: object = {
        dateAt: {
            gte: today,
        },
        ...(userId && { userId: { equals: userId } }),
    }

    return prisma.sumReservation.findMany({
        select: {
            id: true,
            shift: true,
            dateAt: true,
            roomSmall: true,
            roomBig: true,
            reservedAt: true,
            observation: true,
        },
        where,
        orderBy: {
            dateAt: 'asc',
        },
    })
}

export const getGymReservations = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return prisma.sumReservation.findMany({
        select: {
            id: true,
            shift: true,
            dateAt: true,
            roomSmall: true,
            roomBig: true,
            reservedAt: true,
        },
        where: {
            dateAt: {
                gte: today,
            },
        },
        orderBy: {
            dateAt: 'asc',
        },
    })
}

export const getSoccerReservations = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return prisma.sumReservation.findMany({
        select: {
            id: true,
            shift: true,
            dateAt: true,
            roomSmall: true,
            roomBig: true,
            reservedAt: true,
        },
        where: {
            dateAt: {
                gte: today,
            },
        },
        orderBy: {
            dateAt: 'asc',
        },
    })
}
