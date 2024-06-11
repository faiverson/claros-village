import { getMyReservations } from '@/app/actions/reservation'
import { auth } from '@/src/auth'
import ReservationTable from '../components/ReservationTable'

export default async function MisReservas() {
    const reservations = await getMyReservations()

    const session = await auth()

    if ('error' in reservations) {
        return (
            <section className="flex flex-1 flex-col items-center p-4">
                <p>Se ha producido un error, avise al administrador: {reservations.key}</p>
            </section>
        )
    }

    return (
        <section className="flex flex-1 flex-col items-center p-4">
            <ReservationTable reservations={reservations} userRole={session?.user.role} />
        </section>
    )
}
