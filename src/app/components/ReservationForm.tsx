'use client'

import addReservation from '@/app/actions/reservation'
import Alert from '@/app/components/base/Alert'
import { ReservationDBSchema, ReservationSchema } from '@/app/schemas'
import { parseDate } from '@/utils/parser'
import { AlertType, Amenity, SumRoom, SumShift } from '@/utils/types'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CalendarDate,
  DateValue,
  getLocalTimeZone,
  isSameDay,
  parseAbsolute,
  toCalendarDate,
  today,
} from '@internationalized/date'
import { Calendar } from '@nextui-org/calendar'
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Textarea,
} from '@nextui-org/react'
import { SumReservation } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { useEffect, useState, useTransition } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

type ReservationFormProps = {
  reservations: {
    sum: SumReservation[]
    gym: any[]
    soccer: any[]
  }
}

export default function ReservationForm({
  reservations,
}: ReservationFormProps) {
  const t = useTranslations('Reservations')

  const [isPending, startTransition] = useTransition()

  const [message, setMessage] = useState<{
    type: AlertType | null
    text: string
  }>({ type: null, text: '' })
  const [calendarUnavailable, setCalendarUnavailable] = useState<
    CalendarDate[]
  >([])
  const [confirmed, setConfirmed] = useState<object | null>(null)

  const default_date_at = today(getLocalTimeZone()).add({ days: 2 })

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof ReservationSchema>>({
    resolver: zodResolver(ReservationSchema),
    mode: 'onChange',
    defaultValues: {
      amenity: Amenity.Sum,
      shift: SumShift.Day,
      rooms: [],
      date_at: default_date_at,
      observation: '',
    },
  })

  const onSubmit: SubmitHandler<z.infer<typeof ReservationSchema>> = async (
    data,
    ev,
  ) => {
    ev?.preventDefault()
    setMessage({ type: null, text: '' })
    startTransition(async () => {
      const validation = await ReservationSchema.safeParse(data)
      if (validation.success) {
        const date_at = data.date_at.toString()
        const response = await addReservation({ ...data, date_at })
        if (response.error) {
          setMessage({ type: 'error', text: t(response.key) })
        } else {
          setConfirmed({
            amenity: t(data.amenity),
            shift: t(data.shift),
            rooms: (() =>
              data.rooms.length > 1
                ? t('roomBoth')
                : data.rooms.includes(SumRoom.Big)
                  ? t(SumRoom.Big)
                  : t(SumRoom.Small))(),
            date_at: parseDate(new Date(date_at)),
          })
          reset()
        }
      }
    })
  }

  const amenity = watch('amenity')
  const shift = watch('shift')
  const rooms = watch('rooms')

  const handleCloseConfirmation = () => {
    setConfirmed(null)
  }

  const handleDateAvailability = (date: DateValue) =>
    calendarUnavailable.some((day) => isSameDay(date, day))

  useEffect(() => {
    if (amenity === Amenity.Sum) {
      const existReservations = reservations[Amenity.Sum].filter((item) => {
        if (shift === SumShift.Both) {
          return item.shift === SumShift.Day || item.shift === SumShift.Night
        }
        return item.shift === shift
      })
      const unavailableDates = existReservations
        .filter(
          (item) =>
            (item.roomSmall && item.roomBig) ||
            (rooms.includes(SumRoom.Small) && item.roomSmall) ||
            (rooms.includes(SumRoom.Big) && item.roomBig),
        )
        .map((item) =>
          toCalendarDate(parseAbsolute(item.dateAt.toISOString(), 'UTC')),
        )
      // console.log('existReservations', unavailableDates)
      setCalendarUnavailable(unavailableDates)
    }
  }, [amenity, shift, rooms])

  return (
    <div className="flex max-w-4xl grid-cols-1 justify-center gap-4">
      <form
        id="reservation-form"
        name="reservation-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center">
          <div className="mb-5 flex flex-col justify-start space-y-1">
            <h2 className="text-lg font-semibold uppercase">{t('title')}</h2>
            <Divider className="my-6" />
          </div>
          <div className="flex flex-col gap-y-4">
            <div>
              <Controller
                name="amenity"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    label={t('amenity')}
                    orientation="horizontal"
                    {...field}
                    color="success"
                    classNames={{
                      wrapper: 'gap-x-4 justify-center md:justify-start',
                    }}
                  >
                    <Radio value={Amenity.Sum}>{t(Amenity.Sum)}</Radio>
                    <Radio value={Amenity.Gym}>{t(Amenity.Gym)}</Radio>
                    <Radio value={Amenity.Soccer}>{t(Amenity.Soccer)}</Radio>
                  </RadioGroup>
                )}
              />
            </div>
            {Amenity.Sum === amenity && (
              <>
                <div>
                  <Controller
                    name="shift"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <RadioGroup
                        label={t('shift')}
                        orientation="horizontal"
                        {...field}
                        color="success"
                        classNames={{
                          wrapper: 'gap-x-6 gap-y-4',
                        }}
                      >
                        <Radio
                          value={SumShift.Day}
                          description={t(SumShift.Day + 'Desc')}
                        >
                          {t(SumShift.Day)}
                        </Radio>
                        <Radio
                          value={SumShift.Night}
                          description={t(SumShift.Night + 'Desc')}
                        >
                          {t(SumShift.Night)}
                        </Radio>
                        <Radio
                          value={SumShift.Both}
                          description={t(SumShift.Both + 'Desc')}
                        >
                          {t(SumShift.Both)}
                        </Radio>
                      </RadioGroup>
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="rooms"
                    control={control}
                    render={({ field }) => (
                      <CheckboxGroup
                        label={t('rooms')}
                        orientation="horizontal"
                        color="success"
                        classNames={{
                          wrapper: 'gap-x-4',
                        }}
                        //isInvalid={!!errors && !!errors?.rooms} // TODO: is not flipping to valid
                        // errorMessage={errors?.rooms?.message ?? ''}
                        {...field}
                      >
                        <Checkbox value={SumRoom.Small}>
                          {t(SumRoom.Small)}
                        </Checkbox>
                        <Checkbox value={SumRoom.Big}>
                          {t(SumRoom.Big)}
                        </Checkbox>
                      </CheckboxGroup>
                    )}
                  />
                </div>
              </>
            )}
            <div>
              <p className="text-nowrap pb-2 text-medium text-foreground-500">
                {t('calendar')}
              </p>
              <div className="flex justify-center md:justify-start">
                <Controller
                  name="date_at"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => {
                    return (
                      <Calendar
                        color="success"
                        aria-label={t('calendar')}
                        isDisabled={!shift}
                        onChange={(value) => field.onChange(value)}
                        value={field.value}
                        isDateUnavailable={handleDateAvailability}
                        minValue={today(getLocalTimeZone()).add({ days: 1 })}
                        maxValue={today(getLocalTimeZone()).add({
                          months: 3,
                        })}
                      />
                    )
                  }}
                />
              </div>
            </div>
            <div>
              <Textarea
                label={t('observation')}
                variant="bordered"
                color="success"
                placeholder={t('placeholderObservation')}
                isInvalid={!!errors.observation}
                errorMessage={errors.observation?.message}
                {...register('observation')}
              />
            </div>
            <div className="w-full text-right">
              <Button
                radius="sm"
                className="w-fit bg-main-green text-white"
                type="submit"
                disabled={isPending}
              >
                {t('btn_submit')}
              </Button>
            </div>
            <div className="flex flex-col justify-start space-y-1">
              <Alert
                type={message?.type ?? 'info'}
                title={message.type === 'success' ? 'Yey!' : 'Error'}
                message={message.text}
                show={!!message?.type}
              />
            </div>
          </div>
        </div>
      </form>
      {!!confirmed && (
        <Modal
          backdrop="opaque"
          isOpen={!!confirmed}
          onClose={handleCloseConfirmation}
          classNames={{
            backdrop:
              'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {t('confirmationTitle')}
                </ModalHeader>
                <ModalBody>
                  {t(`reservation_success_${amenity}`, { ...confirmed })}
                </ModalBody>
                <ModalFooter>
                  <Button color="success" onPress={onClose}>
                    {t('btn_ok')}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  )
}
