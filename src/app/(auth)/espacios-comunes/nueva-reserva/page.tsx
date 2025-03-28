import ReservationForm from '@/components/ReservationForm'
import { getReservations } from '@/app/actions/reservation'

export default async function NewReservationPage() {
  const result = await getReservations()

  return <ReservationForm existingReservations={result.data || []} />
}
