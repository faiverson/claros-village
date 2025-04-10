import { getReservationsFromToday } from '@/app/actions/reservation'
import { getResidentUsers } from '@/app/actions/user'
import ReservationForm from '@/components/ReservationForm'

export const dynamic = 'force-dynamic'

export default async function NewReservationPage() {
  const [reservationsResult, usersResult] = await Promise.all([getReservationsFromToday(), getResidentUsers()])

  return <ReservationForm existingReservations={reservationsResult.data || []} users={usersResult.data || []} />
}
