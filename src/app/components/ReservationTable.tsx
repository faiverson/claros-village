'use client'

import { destroyReservation } from '@/app/actions/reservation'
import { SumShift } from '@/utils/types'
import { ArchiveBoxXMarkIcon, CalendarIcon, CheckCircleIcon, MoonIcon, PencilSquareIcon, SunIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { DateFormatter } from '@internationalized/date'
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { Role, SumReservation } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Key, SyntheticEvent, useTransition } from 'react'

interface ReservationFormProps {
    reservations: {
        sum: Partial<SumReservation>[]
        gym: unknown[]
        soccer: unknown[]
    }
    userRole?: Role
}

const locale = 'es-AR' // 'es-AR' is the locale for Spanish (Argentina)

export default function ReservationTable({ reservations, userRole }: ReservationFormProps) {
    const t = useTranslations('Reservations')
    const router = useRouter()

    const [isPending, startTransition] = useTransition()
    const isAllowed = [Role.ADMIN as Role, Role.MANAGER as Role].includes(userRole ?? Role.RENTER)

    const columns = [
        {
            key: 'weekDay',
            label: 'Dia',
        },
        {
            key: 'dateAt',
            label: 'Fecha',
        },
        {
            key: 'shift',
            label: 'Turno',
        },
        {
            key: 'roomBig',
            label: 'Salon Grande',
        },
        {
            key: 'roomSmall',
            label: 'Salon Pequeño',
        },
        isAllowed && {
            key: 'reservedAt',
            label: 'Fecha de la reserva',
        },
        {
            key: 'actions',
            label: 'Acciones',
        },
    ].filter(Boolean) as { key: Key; label: string }[]

    const dateFormatter = new DateFormatter(locale, {
        month: 'long',
        day: 'numeric',
    })

    const weekDay = new DateFormatter(locale, {
        weekday: 'long',
    })

    const reservedFormatter = new DateFormatter(locale, {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    })

    const onDestroy = (ev: SyntheticEvent, id: string) => {
        ev.preventDefault()

        if (isPending) return

        startTransition(async () => {
            try {
                await destroyReservation(id)
                router.refresh()
            } catch (error) {
                console.error(error)
            }
        })
    }

    const renderCell = (reservation: Partial<SumReservation>, columnKey: Key) => {
        switch (columnKey) {
            case 'weekDay':
                return reservation.dateAt
                    ? weekDay.format(reservation.dateAt).charAt(0).toUpperCase() + weekDay.format(reservation.dateAt).slice(1)
                    : null
            case 'dateAt':
                return reservation.dateAt ? dateFormatter.format(reservation.dateAt) : null
            case 'reservedAt':
                return reservation.reservedAt ? reservedFormatter.format(reservation.reservedAt) : null
            case 'shift':
                return (
                    <div className="flex items-center gap-x-2">
                        {reservation.shift === SumShift.Day && <SunIcon className="h-5 w-5 stroke-yellow-900" />}
                        {reservation.shift === SumShift.Night && <MoonIcon className="h-5 w-5 stroke-blue-950" />}
                        {reservation.shift === SumShift.Both && <CalendarIcon className="h-5 w-5" />}
                        <span className="">{t(reservation.shift)}</span>
                    </div>
                )
            case 'roomBig':
            case 'roomSmall':
                return (
                    <div className="flex items-center gap-x-2">
                        {reservation[columnKey] ? (
                            <CheckCircleIcon className="h-5 w-5 stroke-green-600" />
                        ) : (
                            <XCircleIcon className="h-5 w-5 stroke-red-400" />
                        )}
                        <span className="">{t(reservation[columnKey] ? 'yes' : 'no')}</span>
                    </div>
                )

            case 'actions':
                return isAllowed ||
                    (reservation.reservedAt && new Date(reservation.reservedAt) > new Date(new Date().setMonth(new Date().getMonth() - 1))) ? (
                    <div className="flex items-center gap-x-2">
                        <Button isIconOnly aria-label={t('edit')} variant="light" color="primary">
                            <PencilSquareIcon className="h-6 w-6" />
                        </Button>
                        <Button
                            isIconOnly
                            aria-label={t('destroy')}
                            variant="light"
                            color="danger"
                            isLoading={isPending}
                            isDisabled={isPending}
                            onClick={(ev) => {
                                if (reservation.id) {
                                    onDestroy(ev, reservation.id)
                                }
                            }}
                        >
                            <ArchiveBoxXMarkIcon className="h-6 w-6" />
                        </Button>
                    </div>
                ) : null
        }
    }

    return (
        <Table aria-label="My reservations" selectionMode="single" removeWrapper>
            <TableHeader columns={columns}>{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}</TableHeader>
            <TableBody items={reservations.sum} emptyContent={t('no_reservations')}>
                {(item) => <TableRow key={item.id}>{(columnKey) => <TableCell key={columnKey}>{renderCell(item, columnKey)}</TableCell>}</TableRow>}
            </TableBody>
        </Table>
    )
}
