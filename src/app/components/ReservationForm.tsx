'use client'

import addReservation from '@/app/actions/reservation'
import Alert from '@/app/components/base/Alert'
import { ReservationSchema } from '@/app/schemas'
import { parseDate } from '@/utils/parser'
import { AlertType, Amenity, SumRoom, SumShift } from '@/utils/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarDate, DateValue, getLocalTimeZone, isSameDay, parseAbsolute, toCalendarDate, today } from '@internationalized/date'
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
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

interface ReservationFormProps {
    reservations: {
        sum: Omit<SumReservation, 'userId'>[]
        gym: unknown[]
        soccer: unknown[]
    }
}

export default function ReservationForm({ reservations }: ReservationFormProps) {
    const t = useTranslations('Reservations')
    const router = useRouter()

    const defToday = today(getLocalTimeZone()).add({ days: 2 })

    const defaultValues = {
        amenity: null as unknown as Amenity,
        shift: null as unknown as SumShift,
        rooms: [],
        date_at: defToday,
        observation: '',
    }

    const [message, setMessage] = useState<{
        type: AlertType | null
        text: string
    }>({ type: null, text: '' })
    const prevAmenity = useRef<Amenity | null>(null)
    const [calendarUnavailable, setCalendarUnavailable] = useState<CalendarDate[]>([])
    const [confirmed, setConfirmed] = useState<{
        amenity: string
        shift: string
        rooms: string
        date_at: string
    } | null>(null)

    const [defaultDateAt, setDefaultDateAt] = useState<CalendarDate>(defToday)

    const {
        register,
        setValue,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { isSubmitting, errors },
    } = useForm<z.infer<typeof ReservationSchema>>({
        resolver: zodResolver(ReservationSchema),
        defaultValues,
        shouldFocusError: true,
    })

    const onSubmit: SubmitHandler<z.infer<typeof ReservationSchema>> = async (data) => {
        setMessage({ type: null, text: '' })

        const validation = ReservationSchema.safeParse(data)
        if (validation.success) {
            const date_at = data.date_at.toString()
            try {
                const response = await addReservation({ ...data, date_at })
                if (response.error) {
                    setMessage({ type: 'error', text: t(response.key) })
                } else {
                    setConfirmed({
                        amenity: t(data.amenity),
                        shift: t(data.shift),
                        rooms: (() =>
                            data.rooms.length > 1 ? t('roomBoth') : data.rooms.includes(SumRoom.Big) ? t(SumRoom.Big) : t(SumRoom.Small))(),
                        date_at: parseDate(new Date(date_at)),
                    })

                    router.refresh() // this will refresh the page to update the reservations
                    reset()
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Error submitting form:', error.message)
                } else {
                    console.error('Unexpected error:', error)
                }
            }
        }
    }

    const amenity = watch('amenity') as Amenity
    const shift = watch('shift') as SumShift
    const rooms = watch('rooms') as SumRoom[]

    const handleCloseConfirmation = () => {
        setConfirmed(null)
    }

    const handleDateAvailability = (date: DateValue) => calendarUnavailable.some((day) => isSameDay(date, day))

    const handleDefaultDate = (selDate: CalendarDate) => {
        if (selDate && handleDateAvailability(selDate)) {
            selDate = selDate.add({ days: 1 })
            handleDefaultDate(selDate)
        }
        return selDate
    }

    useEffect(() => {
        if (amenity === Amenity.Sum && shift && rooms && rooms.length > 0) {
            const unavailableDates = reservations[Amenity.Sum]
                .filter((item) => shift === SumShift.Both || item.shift === shift || item.shift === SumShift.Both)
                .filter(
                    (item) =>
                        (item.roomSmall && item.roomBig) ||
                        (rooms.includes(SumRoom.Small) && item.roomSmall) ||
                        (rooms.includes(SumRoom.Big) && item.roomBig),
                )
                .map((item) => toCalendarDate(parseAbsolute(item.dateAt.toISOString(), 'UTC')))

            setCalendarUnavailable(unavailableDates)
            prevAmenity.current = amenity
        }
        if (!!prevAmenity.current && prevAmenity.current !== amenity) {
            prevAmenity.current = amenity

            setCalendarUnavailable([])
            reset({
                ...defaultValues,
                amenity,
            })
        }
    }, [amenity, shift, rooms, reservations, prevAmenity])

    useEffect(() => {
        if (calendarUnavailable && calendarUnavailable.length > 0) {
            const newDefDateAt = handleDefaultDate(defaultDateAt)
            if (newDefDateAt.toString() !== defaultDateAt.toString()) {
                setDefaultDateAt(newDefDateAt)
                setValue('date_at', newDefDateAt)
            }
        } else {
            setDefaultDateAt(defToday)
        }
    }, [calendarUnavailable])

    return (
        <div className="flex max-w-4xl grid-cols-1 justify-center gap-4">
            <form id="reservation-form" name="reservation-form" onSubmit={handleSubmit(onSubmit)}>
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
                                        isInvalid={!!errors.amenity}
                                        errorMessage={errors.amenity?.message}
                                    >
                                        <Radio value={Amenity.Sum}>{t(Amenity.Sum)}</Radio>
                                        <Radio value={Amenity.Gym}>{t(Amenity.Gym)}</Radio>
                                        <Radio value={Amenity.Soccer}>{t(Amenity.Soccer)}</Radio>
                                    </RadioGroup>
                                )}
                            />
                        </div>
                        <Divider />
                        {amenity && (
                            <>
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
                                                        isInvalid={!!errors.shift}
                                                        errorMessage={errors.shift?.message}
                                                    >
                                                        <Radio value={SumShift.Day} description={t(SumShift.Day + 'Desc')}>
                                                            {t(SumShift.Day)}
                                                        </Radio>
                                                        <Radio value={SumShift.Night} description={t(SumShift.Night + 'Desc')}>
                                                            {t(SumShift.Night)}
                                                        </Radio>
                                                        <Radio value={SumShift.Both} description={t(SumShift.Both + 'Desc')}>
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
                                                        isInvalid={!!errors.rooms}
                                                        errorMessage={errors.rooms?.message}
                                                        {...field}
                                                    >
                                                        <Checkbox value={SumRoom.Small}>{t(SumRoom.Small)}</Checkbox>
                                                        <Checkbox value={SumRoom.Big}>{t(SumRoom.Big)}</Checkbox>
                                                    </CheckboxGroup>
                                                )}
                                            />
                                        </div>
                                    </>
                                )}
                                <div>
                                    <p className="text-nowrap pb-2 text-medium text-foreground-500">{t('calendar')}</p>
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
                                                        isDisabled={!shift || (rooms && rooms.length < 1)}
                                                        onChange={(value) => {
                                                            field.onChange(value)
                                                        }}
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
                            </>
                        )}
                        <div className="w-full text-right">
                            <Button radius="sm" className="w-fit bg-main-green text-white" type="submit" isLoading={isSubmitting}>
                                {t('btn_submit')}
                            </Button>
                        </div>
                        <div className="flex flex-col justify-start space-y-1">
                            <Alert
                                type={message.type ?? 'info'}
                                title={message.type === 'success' ? 'Yey!' : 'Error'}
                                message={message.text}
                                show={!!message.type}
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
                        backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
                    }}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">{t('confirmationTitle')}</ModalHeader>
                                <ModalBody>{t(`reservation_success_${confirmed.amenity.toLowerCase()}`, { ...confirmed })}</ModalBody>
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
