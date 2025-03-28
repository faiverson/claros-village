'use server';

import { getServerSession } from 'next-auth';
import { Amenity, SumRoom } from '@/types/enums';
import { ReservationDBSchema, ReservationSchemaType } from '@/app/schemas/reservation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function addReservation(data: ReservationSchemaType) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return { error: true, key: 'invalid_session' };
  }

  const validatedFields = ReservationDBSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: true, key: 'invalid_reservation' };
  }

  const { amenity, shift, date_at, rooms, observation } = data;

  let newReservation;
  switch (amenity) {
    case Amenity.Sum: {
      const sumData = {
        shift,
        dateAt: new Date(date_at),
        observation,
        rooms,
        userId,
      };

      const existReservation = await getExistSumReservation(sumData);

      if (existReservation) {
        return { error: true, key: 'reservation_exist' };
      }

      newReservation = await addSumReservation(sumData);
      break;
    }

    default:
      break;
  }

  return { success: true, data: newReservation };
}

// Helper function to check if a reservation exists
async function getExistSumReservation(data: {
  shift: string;
  dateAt: Date;
  rooms: string[];
  userId: string;
}) {
  const existingReservation = await prisma.sumReservation.findFirst({
    where: {
      dateAt: data.dateAt,
      shift: data.shift,
      OR: [
        { roomBig: data.rooms.includes(SumRoom.Big) },
        { roomSmall: data.rooms.includes(SumRoom.Small) }
      ]
    }
  });

  return !!existingReservation;
}

// Helper function to add a SUM reservation
async function addSumReservation(data: {
  shift: string;
  dateAt: Date;
  observation: string | undefined;
  rooms: string[];
  userId: string;
}) {
  return await prisma.sumReservation.create({
    data: {
      dateAt: data.dateAt,
      shift: data.shift,
      observation: data.observation || null,
      roomBig: data.rooms.includes(SumRoom.Big),
      roomSmall: data.rooms.includes(SumRoom.Small),
      user: {
        connect: {
          id: data.userId,
        },
      },
    },
  });
}

export async function getReservations() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      error: true,
      key: 'invalid_session',
      message: 'Invalid session'
    };
  }

  try {
    const reservations = await prisma.sumReservation.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        dateAt: 'asc'
      }
    });

    return {
      error: false,
      data: reservations
    };
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return {
      error: true,
      key: 'fetch_error',
      message: 'Error fetching reservations'
    };
  }
}

export async function deleteReservation(id: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      error: true,
      key: 'invalid_session',
      message: 'Invalid session'
    };
  }

  try {
    // First verify the reservation belongs to the user
    const reservation = await prisma.sumReservation.findFirst({
      where: {
        id,
        userId: session.user.id
      }
    });

    if (!reservation) {
      return {
        error: true,
        key: 'not_found',
        message: 'Reservation not found'
      };
    }

    // Check if the reservation is in the past
    const reservationDate = new Date(reservation.dateAt);
    if (reservationDate < new Date()) {
      return {
        error: true,
        key: 'past_reservation',
        message: 'Cannot delete past reservations'
      };
    }

    // Delete the reservation
    await prisma.sumReservation.delete({
      where: { id }
    });

    return {
      error: false,
      message: 'Reservation deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting reservation:', error);
    return {
      error: true,
      key: 'delete_error',
      message: 'Error deleting reservation'
    };
  }
}

export async function getReservationsFromToday() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      error: true,
      key: 'invalid_session',
      message: 'Invalid session'
    };
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const reservations = await prisma.sumReservation.findMany({
      where: {
        userId: session.user.id,
        dateAt: {
          gte: today
        }
      },
      orderBy: {
        dateAt: 'asc'
      }
    });

    return {
      error: false,
      data: reservations || []
    };
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return {
      error: true,
      key: 'fetch_error',
      message: 'Error fetching reservations'
    };
  }
}

export async function getAllReservationsFromToday() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      error: true,
      key: 'invalid_session',
      message: 'Invalid session'
    };
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const reservations = await prisma.sumReservation.findMany({
      where: {
        dateAt: {
          gte: today
        }
      },
      orderBy: {
        dateAt: 'asc'
      }
    });

    console.log('All reservations from today:', reservations); // Debug log

    return {
      error: false,
      data: reservations || []
    };
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return {
      error: true,
      key: 'fetch_error',
      message: 'Error fetching reservations'
    };
  }
}
