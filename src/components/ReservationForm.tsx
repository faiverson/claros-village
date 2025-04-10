'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Role, SumReservation } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useForm, FormProvider } from 'react-hook-form'
import { toast } from 'sonner'

import { addReservation } from '@/app/actions/reservation'
import { ReservationFormSchema, type ReservationFormType } from '@/app/schemas/reservation'
import { FormLayout } from '@/components/layouts/FormLayout'
import { CVCalendar } from '@/components/ui/cv-calendar'
import { CVCheckboxGroup } from '@/components/ui/cv-checkbox-group'
import { CVRadioGroup } from '@/components/ui/cv-radio-group'
import { CVSelect } from '@/components/ui/cv-select'
import { CVTextArea } from '@/components/ui/cv-textarea'
import { usePermission } from '@/hooks/usePermission'
import { Amenity, SumShift, SumRoom } from '@/utils/enums'

interface ReservationFormProps {
  existingReservations: SumReservation[]
  users: Array<{ id: string; name: string | null; unidad: string | null }>
}

const defaultValues: Partial<ReservationFormType> = {
  amenity: Amenity.Sum,
  rooms: [],
  observation: '',
  date_at: undefined,
}

const amenityOptions = [
  { id: Amenity.Sum, value: Amenity.Sum, label: 'SUM' },
  { id: Amenity.Gym, value: Amenity.Gym, label: 'Gimnasio' },
  { id: Amenity.Soccer, value: Amenity.Soccer, label: 'Canchas de Fútbol' },
]

const shiftOptions = [
  { id: SumShift.Day, value: SumShift.Day, label: 'Diurno' },
  { id: SumShift.Night, value: SumShift.Night, label: 'Noche' },
  { id: SumShift.Both, value: SumShift.Both, label: 'Ambos' },
]

const roomOptions = [
  { id: SumRoom.Small, value: SumRoom.Small, label: 'Salón Chico' },
  { id: SumRoom.Big, value: SumRoom.Big, label: 'Salón Grande' },
]

export default function ReservationForm({ existingReservations, users }: ReservationFormProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const { hasPermission } = usePermission([Role.ADMIN, Role.MANAGER])
  const canCreateSumReservation = hasPermission()

  const methods = useForm<ReservationFormType>({
    defaultValues: {
      ...defaultValues,
      userId: canCreateSumReservation ? undefined : session?.user?.id,
    },
    resolver: zodResolver(ReservationFormSchema(session?.user?.role)),
  })

  const {
    handleSubmit,
    formState: { errors },
    watch,
  } = methods

  const { amenity, shift, rooms } = watch()

  const isDateDisabled = (date: Date) => {
    if (!shift || !rooms?.length) return false

    const dateStr = date.toISOString().split('T')[0]

    return existingReservations.some((reservation) => {
      const reservationDate = new Date(reservation.dateAt).toISOString().split('T')[0]

      // Check if dates match
      if (reservationDate !== dateStr) return false

      // Check shift conflicts
      const hasShiftConflict =
        shift === SumShift.Both || // If user selected both shifts, any existing shift conflicts
        reservation.shift === SumShift.Both || // If existing reservation has both shifts, it conflicts
        shift === reservation.shift // If shifts match exactly

      if (!hasShiftConflict) return false

      // Check room conflicts
      const hasRoomConflict =
        (rooms.includes(SumRoom.Big) && reservation.roomBig) || // Big room conflict
        (rooms.includes(SumRoom.Small) && reservation.roomSmall) || // Small room conflict
        (rooms.includes(SumRoom.Big) && rooms.includes(SumRoom.Small)) || // User selected both rooms
        (reservation.roomBig && reservation.roomSmall) // Existing reservation has both rooms

      return hasRoomConflict
    })
  }

  const onSubmit = async (data: ReservationFormType) => {
    if (canCreateSumReservation && !data.userId) {
      toast.error('Debe seleccionar un usuario')
      return
    }

    const loadingToast = toast.loading('Procesando tu reserva...')

    try {
      const result = await addReservation(data)

      // Remove loading toast
      toast.dismiss(loadingToast)

      if (result.error) {
        switch (result.key) {
          case 'invalid_session':
            toast.error('Tu sesión ha expirado', {
              description: 'Por favor, inicia sesión nuevamente para continuar.',
              duration: Infinity,
              action: {
                label: 'Iniciar sesión',
                onClick: () => router.push('/login'),
              },
              closeButton: true,
            })
            break

          case 'invalid_reservation':
            toast.error('Datos inválidos', {
              description: 'Por favor, verifica los datos ingresados e intenta nuevamente.',
              closeButton: true,
            })
            break

          case 'reservation_exist':
            toast.error('Reserva no disponible', {
              description: 'Ya existe una reserva para esta fecha y horario.',
            })
            break

          default:
            toast.error('Error inesperado', {
              description: 'No pudimos procesar tu reserva. Por favor, intenta nuevamente.',
            })
        }
        return
      }

      toast.success('Reserva creada exitosamente', {
        description: 'Tu reserva ha sido registrada correctamente.',
      })

      methods.reset(defaultValues)
      router.refresh()
    } catch {
      toast.dismiss(loadingToast)
      toast.error('Error de conexión', {
        description: 'Hubo un problema al procesar tu solicitud. Por favor, verifica tu conexión e intenta nuevamente.',
      })
    }
  }

  return (
    <FormProvider {...methods}>
      <FormLayout>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {canCreateSumReservation && (
            <div className="space-y-2">
              <label htmlFor="userId" className="text-sm font-medium">
                Usuario
              </label>
              <CVSelect
                id="userId"
                name="userId"
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name ? `${user.name}${user.unidad ? ` (${user.unidad})` : ''}` : 'Usuario sin nombre',
                }))}
                placeholder="Seleccionar usuario"
                error={errors.userId?.message}
              />
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor="amenity" className="text-sm font-medium">
              Espacios
            </label>
            <CVRadioGroup id="amenity" className="flex gap-4" name="amenity" options={amenityOptions} />
            {errors.amenity && <p className="text-sm text-destructive-500">{errors.amenity.message}</p>}
          </div>
          {amenity === Amenity.Sum && (
            <>
              <div className="space-y-2">
                <label htmlFor="shift" className="text-sm font-medium">
                  Turno
                </label>
                <CVRadioGroup id="shift" className="flex gap-4" name="shift" options={shiftOptions} />
                {errors.shift && <p className="text-sm text-destructive-500">{errors.shift.message}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="rooms" className="text-sm font-medium">
                  Salones
                </label>
                <CVCheckboxGroup name="rooms" options={roomOptions} />
                {errors.rooms && <p className="text-sm text-destructive-500">{errors.rooms.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Calendario</label>
                <CVCalendar name="date_at" disabled={!shift || !rooms?.length || isDateDisabled} />
                {errors.date_at && <p className="text-sm text-destructive-500">{errors.date_at.message}</p>}
              </div>
              <div className="space-y-2">
                <CVTextArea name="observation" placeholder="Ingrese sus observaciones aquí..." label="Observaciones" />
                {errors.observation && <p className="text-sm text-destructive-500">{errors.observation.message}</p>}
              </div>
            </>
          )}
          <button type="submit" className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-600 transition-colors">
            Reservar
          </button>
        </form>
      </FormLayout>
    </FormProvider>
  )
}
