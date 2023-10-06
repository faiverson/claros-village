'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function Page() {

  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')

  // const signEmail = () => {
  //   return signIn('email')
  // }

  const signGoogle = () => {
    return signIn('google')
  }

  return (
    <section className='content'>
      <div className='flex justify-center'>
        <form>
          {/* <div class="grid gap-6 mb-6 md:grid-rows-2">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input id="email" type="text" value={email} onChange={ev => setEmail(ev.target.value)} className="input" placeholder="John" required />
            </div>
            <div>
              <label htmlFor="password" className="label">Contraseña</label>
              <input id="password" className='input' type="password" value={password} onChange={ev => setPassword(ev.target.value)} />
            </div>
          </div>
          <button className='button' onClick={signEmail}>Loguearse</button> */}
        </form>
        <button type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2" onClick={signGoogle}>
          <svg className="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
            <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd" />
          </svg>
          Sign in with Google
        </button>
      </div>
    </section>
  )
}
