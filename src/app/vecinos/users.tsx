import { collection, getDocs } from 'firebase/firestore'
import { db } from 'app/firebase'
import React from 'react'

export type Vecino = {
  id: string
  nombre: string
  manzana: string
  unidad: string
  email_propietario: string
  email_expensas: string
  lote: string
  propietario: boolean
  numero_expensas: string
  direccion: string
}

const getUsers = async (): Promise<Vecino[]> => {
  const usersCollection = collection(db, 'users')
  const snapshot = await getDocs(usersCollection)

  const users = snapshot.docs.map(doc => {
    const data = doc.data()
    return {
      id: doc.id,
      nombre: data.nombre || '',
      manzana: data.manzana || '',
      unidad: data.unidad || '',
      email_propietario: data.email_propietario || '',
      email_expensas: data.email_expensas || '',
      lote: data.lote || '',
      propietario: data.propietario || false,
      numero_expensas: data.numero_expensas || '',
      direccion: data.direccion || '',
    } as Vecino
  })

  return users
}

export default async function Users() {
  const users = await getUsers()

  const parse = (val: string, delimiter: string): JSX.Element => {
    const parts = val.split(delimiter)
    return (
      <>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < parts.length - 1 && <br />}
          </React.Fragment>
        ))}
      </>
    )
  }

  return (
    <tbody>
      {
        users.slice().map((item: Vecino, idx: number) => {
          return (
            <tr key={item.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
              <td scope="row" className='px-4 py-4' >{idx + 1}</td>
              <td scope="row" className='pr-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white' >{item.unidad}</td>
              <td scope="row" className='px-4 py-4 whitespace-nowrap'>{parse(item.nombre, '-')}</td>
              <td scope="row" className='px-6 py-4 whitespace-nowrap'>{parse(item.email_propietario, ';')}</td>
              <td scope="row" className='px-6 py-4 whitespace-nowrap'>{parse(item.email_expensas, ';')}</td>
            </tr>
          )
        })
      }
    </tbody>
  )
}
