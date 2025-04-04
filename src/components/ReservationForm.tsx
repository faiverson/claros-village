'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Amenity, SumShift, SumRoom } from '@/types/enums'
import { Textarea } from '@/components/ui/textarea'
import { CVRadioOption } from '@/components/ui/cv-radio-option'
import { CVCheckboxOption } from '@/components/ui/cv-checkbox-option'
import { CVCalendar } from '@/components/ui/cv-calendar'
import { CVRadioGroup } from '@/components/ui/cv-radio-group'
import { CVCheckboxGroup } from '@/components/ui/cv-checkbox-group'
import { addReservation } from '@/app/actions/reservation'
import { toast } from 'sonner'
import { SumReservation } from '@prisma/client'

interface ReservationFormData {
  amenity: Amenity
  shift: SumShift
  rooms: SumRoom[]
  date_at: Date
  observation?: string
}

interface ReservationFormProps {
  existingReservations: SumReservation[]
}

const defaultValues: Partial<ReservationFormData> = {
  amenity: Amenity.Sum,
  rooms: [],
  observation: '',
  date_at: undefined,
}

export default function ReservationForm({ existingReservations }: ReservationFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ReservationFormData>({
    defaultValues,
  })

  console.log('existingReservations', existingReservations)

  const { amenity, shift, rooms, date_at } = watch()

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

  const onSubmit = async (data: ReservationFormData) => {
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

      reset(defaultValues)
      router.refresh()
    } catch {
      toast.dismiss(loadingToast)
      toast.error('Error de conexión', {
        description: 'Hubo un problema al procesar tu solicitud. Por favor, verifica tu conexión e intenta nuevamente.',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="space-y-2">
        <label className="text-sm font-medium">Espacios</label>
        <CVRadioGroup
          className="flex gap-4"
          register={register('amenity', {
            required: `Debe seleccionar un espacio (current: ${amenity || 'none'})`,
          })}
          value={amenity}
        >
          <CVRadioOption id={Amenity.Sum} value={Amenity.Sum} label="SUM" />
          <CVRadioOption id={Amenity.Gym} value={Amenity.Gym} label="Gimnasio" />
          <CVRadioOption id={Amenity.Soccer} value={Amenity.Soccer} label="Canchas de Fútbol" />
        </CVRadioGroup>
        {errors.amenity && <p className="text-sm text-destructive-500">{errors.amenity.message}</p>}
      </div>
      {amenity === Amenity.Sum && (
        <>
          <div className="space-y-2">
            <label className="text-sm font-medium">Turno</label>
            <CVRadioGroup className="flex gap-4" register={register('shift', { required: 'Debe seleccionar un turno' })} value={shift}>
              <CVRadioOption id={SumShift.Day} value={SumShift.Day} label="Diurno" />
              <CVRadioOption id={SumShift.Night} value={SumShift.Night} label="Noche" />
              <CVRadioOption id={SumShift.Both} value={SumShift.Both} label="Ambos" />
            </CVRadioGroup>
            {errors.shift && <p className="text-sm text-destructive-500">{errors.shift.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Salones</label>
            <CVCheckboxGroup
              className="flex gap-4"
              register={register('rooms', {
                required: 'Debe seleccionar al menos un salón',
                validate: (value) => (value?.length ?? 0) > 0 || 'Debe seleccionar al menos un salón',
              })}
              value={rooms}
              onValueChange={(newRooms) => setValue('rooms', newRooms, { shouldValidate: true })}
            >
              <CVCheckboxOption id={SumRoom.Small} value={SumRoom.Small} label="Salón Chico" />
              <CVCheckboxOption id={SumRoom.Big} value={SumRoom.Big} label="Salón Grande" />
            </CVCheckboxGroup>
            {errors.rooms && <p className="text-sm text-destructive-500">{errors.rooms.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Calendario</label>
            <div className="flex justify-center md:justify-start">
              <CVCalendar
                selected={date_at}
                onSelect={(date) => {
                  if (date) {
                    setValue('date_at', date, {
                      shouldValidate: true,
                    })
                  }
                }}
                disabled={!shift || !rooms?.length || isDateDisabled}
                {...register('date_at', {
                  required: 'Debe seleccionar una fecha',
                })}
              />
            </div>
            {errors.date_at && <p className="text-sm text-destructive-500">{errors.date_at.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Observaciones</label>
            <Textarea {...register('observation')} placeholder="Ingrese sus observaciones aquí..." className="min-h-[100px]" />
            {errors.observation && <p className="text-sm text-destructive-500">{errors.observation.message}</p>}
          </div>
        </>
      )}
      <button type="submit" className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-600 transition-colors">
        Reservar
      </button>
    </form>
  )
}
