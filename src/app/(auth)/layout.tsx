import { Image } from '@nextui-org/react'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-1 flex-col items-center p-4 md:p-0">
      <div className="flex h-full w-full flex-col items-center md:flex-row">
        <div className="flex h-full w-full max-w-2xl flex-col items-center justify-center">
          {children}
        </div>
        <div className="hidden w-1/2 md:flex">
          <Image
            className="rounded-none object-cover opacity-60"
            isBlurred
            src="/static/img/photo-login-page.avif"
            alt="login page image"
          />
        </div>
      </div>
    </section>
  )
}
