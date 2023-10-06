'use client'

// import { Metadata } from 'next'
import { useState } from 'react'
import { upload, MorososResult, User } from '../server/actions/upload'

// export const metadata: Metadata = {
//   title: 'Morosos',
// }

export default function Page() {
  const [users, setUsers] = useState<MorososResult | null>()

  const onSubmit = async (formData: FormData) => {
    const data: MorososResult = await upload(formData)
    setUsers(data)
  }

  const onDownload = async () => {
    if (!!users && users.morosos.length > 0) {
      const response = await fetch('/api/download/morosos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ morosos: users.morosos }),
      });

      if (response.status === 200) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'morosos.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      }
    }
  }

  return (
    <section className='content flex flex-col'>
      <div className='main flex flex-wrap w-full justify-center items-start px-36'>
        <form action={onSubmit}>
          <input type="file" name="file" />
          <input className='button' type="submit" value="Upload" />
        </form>
        {!!users?.notFounded && users.notFounded.length > 0 &&
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 my-10'>
            <thead className="text-xs text-gray-700 uppercase bg-green-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" colSpan={3} className="px-6 py-3 text-center">Unidades/Propietarios no encontrados</th>
              </tr>
              <tr>
                <th scope="col" className="px-6 py-3">#</th>
                <th scope="col" className="px-6 py-3">Unidad</th>
                <th scope="col" className="px-6 py-3 text-right">Expensas</th>
              </tr>
            </thead>
            <tbody>
              {
                users.notFounded.slice().sort((a, b) => parseInt(b.expensas_adeudadas!) - parseInt(a.expensas_adeudadas!)).map((item: {
                  unidad: string
                  expensas_adeudadas: string
                }, idx: number) => {
                  return (
                    <tr key={`not-fond-${idx}`} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                      <td scope="row" className='px-6 py-4' >{idx + 1}</td>
                      <td scope="row" className='pr-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white' >{item.unidad}</td>
                      <td scope="row" className='px-6 py-4 text-right'>{item.expensas_adeudadas}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        }
        {!!users &&
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className="text-xs text-gray-700 uppercase bg-green-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">#</th>
                <th scope="col" className="px-6 py-3">Unidad</th>
                <th scope="col" className="px-6 py-3">Propietario</th>
                <th scope="col" className="px-6 py-3 text-right">Expensas</th>
              </tr>
            </thead>
            <tbody>
              {
                users.morosos.slice().sort((a, b) => parseInt(b.expensas_adeudadas!) - parseInt(a.expensas_adeudadas!)).map((item: User, idx: number) => {
                  return (
                    <tr key={item.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                      <td scope="row" className='px-6 py-4' >{idx + 1}</td>
                      <td scope="row" className='pr-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white' >{item.unidad}</td>
                      <td scope="row" className='px-6 py-4'>{item.nombre}</td>
                      <td scope="row" className='px-6 py-4 text-right'>{item.expensas_adeudadas}</td>
                    </tr>
                  )
                })
              }
            </tbody>
            <tfoot>
              <tr className="font-semibold text-gray-900 dark:text-white">
                <th scope="row" colSpan={4} className="px-6 py-3 text-base text-right">
                  <button className='button' onClick={onDownload}>Descargar</button>
                </th>
              </tr>
            </tfoot>
          </table>
        }
      </div>
    </section>
  )
}
