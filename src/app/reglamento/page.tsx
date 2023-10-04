import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reglamento',
}

export default function Page() {

  return (
    <section className='content reglamento'>
      <div className=''>
        <iframe src={'/static/reglamento.pdf'} width="100%" height="800px" />
      </div>
    </section>
  )
}
