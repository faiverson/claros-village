'use client';

import { SumReservation } from '@prisma/client';
import { SumShift } from '@/types/enums';
import { deleteReservation } from '@/app/actions/reservation';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { CVDeleteButton } from '@/components/ui/cv-delete-button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface MyReservationsProps {
  reservations: SumReservation[];
}

export function MyReservations({ reservations }: MyReservationsProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const loadingToast = toast.loading('Eliminando reserva...');

    try {
      const result = await deleteReservation(id);

      // Remove loading toast
      toast.dismiss(loadingToast);

      if (result.error) {
        switch (result.key) {
          case 'invalid_session':
            toast.error('Tu sesión ha expirado', {
              description: 'Por favor, inicia sesión nuevamente para continuar.',
              duration: Infinity,
              action: {
                label: 'Iniciar sesión',
                onClick: () => router.push('/login')
              },
              closeButton: true
            });
            break;

          case 'past_reservation':
            toast.error('No se puede eliminar', {
              description: 'No se pueden eliminar reservas pasadas.'
            });
            break;

          case 'not_found':
            toast.error('Reserva no encontrada', {
              description: 'La reserva que intentas eliminar no existe.'
            });
            break;

          default:
            toast.error('Error inesperado', {
              description: 'No pudimos eliminar la reserva. Por favor, intenta nuevamente.'
            });
        }
        setDeletingId(null);
        return;
      }

      toast.success('Reserva eliminada', {
        description: 'Tu reserva ha sido eliminada correctamente.'
      });

      // Wait for the animation to complete before refreshing
      setTimeout(() => {
        router.refresh();
      }, 300); // Match the animation duration
    } catch {
      toast.dismiss(loadingToast);
      toast.error('Error de conexión', {
        description: 'Hubo un problema al procesar tu solicitud. Por favor, verifica tu conexión e intenta nuevamente.',
      });
      setDeletingId(null);
    }
  };

  if (!reservations || reservations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-gray-200 rounded-lg">
        <div className="w-12 h-12 text-gray-400 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay reservas en el SUM</h3>
        <p className="text-gray-500 max-w-sm">
          Aún no has reservado ningún espacio en el SUM. Selecciona el turno y los salones que necesitas para crear tu primera reserva.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reservations.map((reservation) => {
        const reservationDate = new Date(reservation.dateAt);
        const isToday = reservationDate.toDateString() === new Date().toDateString();
        const isPast = reservationDate < new Date();
        const isDeleting = deletingId === reservation.id;

        return (
          <div
            key={reservation.id}
            className={cn(
              "group relative p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden",
              isDeleting && "opacity-0 scale-95 transition-all duration-300"
            )}
          >
            {/* Status indicator */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:bg-gray-100 transition-colors" />

            {/* Main content */}
            <div className="relative">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">SUM</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      isToday
                        ? 'bg-green-100 text-green-800'
                        : isPast
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {isToday ? 'Hoy!' : isPast ? 'Pasada' : 'Próxima'}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-md text-gray-600 flex items-center gap-2 font-bold">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                      </svg>
                      {reservationDate.toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      <b>Turno:</b> {reservation.shift === SumShift.Day ? 'Diurno' : reservation.shift === SumShift.Night ? 'Nocturno' : 'Día Completo'}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                      </svg>
                      <b>Salones:</b> {reservation.roomBig && reservation.roomSmall
                        ? 'Ambos'
                        : reservation.roomBig
                        ? 'Grande'
                        : 'Chico'}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {!isPast && (
                    <CVDeleteButton
                      onClick={() => handleDelete(reservation.id)}
                      className="px-2 py-1"
                    />
                  )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                {reservation.observation && (
                  <p className="text-sm text-gray-600 flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mt-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                    </svg>
                    {reservation.observation}
                  </p>
                )}
                <div className="text-xs text-gray-500">
                  Reservado el {new Date(reservation.reservedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
