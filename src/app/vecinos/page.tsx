'use client'

import Users from './users'

export default function Page() {
  return (
    <section className='content flex flex-col overflow-auto'>
      <div className='main flex flex-wrap w-full justify-center items-start'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className="text-xs text-gray-700 uppercase bg-green-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">#</th>
              <th scope="col" className="px-6 py-3">Unidad</th>
              <th scope="col" className="px-6 py-3">Propietario</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Email Expensas</th>
              { }
            </tr>
          </thead>
          <Users />
        </table>
      </div>
    </section>
  )
}
