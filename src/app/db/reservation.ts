import prisma from '@/src/db'
import { SumRoom, SumShift } from '@/utils/types'

export type GetReservationProps = {
  shift: SumShift
  dateAt: Date
  userId: string
  rooms: SumRoom[]
  observation?: string | null
}

export const getExistReservation = async ({
  dateAt,
  shift,
}: GetReservationProps) => {
  return await prisma.sumReservation.findFirst({
    where:
      shift === SumShift.Both
        ? {
            OR: [
              {
                dateAt,
                shift: SumShift.Day,
              },
              {
                dateAt,
                shift: SumShift.Night,
              },
            ],
          }
        : {
            dateAt,
            shift,
          },
  })
}

export const addSumReservation = async ({
  dateAt,
  shift,
  userId,
  rooms,
  observation,
}: GetReservationProps) => {
  const sumRooms = {
    roomBig: rooms.includes(SumRoom.Big),
    roomSmall: rooms.includes(SumRoom.Small),
  }
  if (shift === SumShift.Both) {
    const reservations = [
      { observation, dateAt, userId, shift: SumShift.Night, ...sumRooms },
      { observation, dateAt, userId, shift: SumShift.Day, ...sumRooms },
    ]
    return await prisma.sumReservation.createManyAndReturn({
      data: reservations,
    })
  }
  return await prisma.sumReservation.create({
    data: {
      dateAt,
      shift,
      observation,
      ...sumRooms,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  })
}

export const getSumReservations = () => {
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
