export interface User {
    id?: string
    name?: string
    email?: string
    image?: string
    role?: string
}

export enum SumShift {
    Morning = 'MORNING',
    Afternoon = 'AFTERNOON',
    Evening = 'EVENING',
}

export enum Amenity {
    Sum = 'SUM',
    Pool = 'POOL',
    Tennis = 'TENNIS',
    Gym = 'GYM',
}

export enum SumRoom {
    Main = 'MAIN',
    Secondary = 'SECONDARY',
    Outdoor = 'OUTDOOR',
}

export type AlertType = 'error' | 'success' | 'warning' | 'info'

export type ReservationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

export interface Reservation {
  id: string;
  userId: string;
  amenityId: string;
  date: Date;
  status: ReservationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface SumReservation extends Reservation {
  roomId: string;
  shiftId: string;
  guestCount: number;
  observation?: string;
}
