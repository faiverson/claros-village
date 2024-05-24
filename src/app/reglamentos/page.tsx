import {
  BuildingOffice2Icon,
  BuildingOfficeIcon,
  HomeModernIcon,
} from '@heroicons/react/24/outline'
import { Card, CardHeader, Link } from '@nextui-org/react'

const reglamentos = [
  {
    title: 'Barrio',
    icon: BuildingOffice2Icon,
    link: '/static/reglamentos/reglamento-interno.pdf',
    description: 'Codigo de convivencia interno',
  },
  {
    title: 'SUM',
    icon: BuildingOffice2Icon,
    link: '/static/reglamentos/reglamento-sum.pdf',
    description: 'Reglamento interno del uso del SUM',
  },
  {
    title: 'GYM',
    icon: HomeModernIcon,
    link: '/static/reglamentos/reglamento-gym.pdf',
    description: 'Reglamento para el uso del gimnasio',
  },
  {
    title: 'Obras',
    icon: BuildingOfficeIcon,
    link: '/static/reglamentos/reglamento-obras.pdf',
    description: 'Reglamento para el proyecto de una nueva vivienda',
  },
]

export default function Reglamentos() {
  return (
    <section className="flex flex-1 flex-col items-center p-4">
      <div className="grid max-w-4xl grid-cols-1 justify-center gap-4 md:grid-cols-2">
        {reglamentos.map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.link}>
              <CardHeader className="flex gap-3">
                <div className="flex h-40 w-full flex-col items-center justify-center gap-y-8">
                  <div className="flex items-center gap-x-4">
                    {Icon && <Icon className="h-8 w-8 " />}
                    <span className="text-lg">{item.title}</span>
                  </div>
                  <p className="text-small text-default-500">
                    <Link isExternal showAnchorIcon href="/reglamento-sum.pdf">
                      {item.description}
                    </Link>
                  </p>
                </div>
              </CardHeader>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
