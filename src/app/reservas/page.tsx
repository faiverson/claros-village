import { getReservations } from '@/app/actions/reservation'
import ReservationForm from '@/components/ReservationForm'

export default async function Reservas() {
    const reservations = await getReservations()

    return (
        <section className="flex flex-1 flex-col items-center p-4">
            <ReservationForm reservations={reservations} />
        </section>
    )
}
