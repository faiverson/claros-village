import { getReservations } from '@/app/actions/reservation'
import { MyReservations } from '@/components/MyReservations'

export default async function ReservasPage() {
  const result = await getReservations()

  return <MyReservations reservations={result.data || []} />
}
