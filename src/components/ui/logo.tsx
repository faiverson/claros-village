'use client'

import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'

interface LogoProps {
  href?: string
  className?: string
}

export function Logo({ href, className }: LogoProps) {
  const image = (
    <Image
      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apple-icon-N7jTiQdeotAf7rPPNseI1SUJZ2cKZl.png"
      alt="Claros Village Logo"
      width={150}
      height={50}
      className={cn('h-8 w-auto', className)}
    />
  )

  if (href) {
    return (
      <Link href={href} className="flex items-center gap-2">
        {image}
      </Link>
    )
  }

  return image
}
