export interface User {
    id?: string
    name?: string
    email?: string
    image?: string
    role?: string
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
