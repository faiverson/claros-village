import { MyReservations } from '@/components/MyReservations'
import { getReservations } from '@/app/actions/reservation'

export default async function ReservasPage() {
  const result = await getReservations()

  return <MyReservations reservations={result.data || []} />
}
