import { User } from '@prisma/client'

export const RegisterTemplate = (user: User, hash: string) => {
  const link = `${process.env.HOST}/api/verified/${user.id}/${hash}`
  return (
    <div>
      <h1>Bienvenido, {user.name}!</h1>
      <p>
        Para continuar necesita confirmar el email clickeando{' '}
        <a href={link}>aqui</a>
      </p>
      <p>O copie y pegue el siguiente link en su navegador: {link}</p>
    </div>
  )
}
