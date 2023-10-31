import Post from 'components/Post'
import Image from 'next/image'

export default function Home() {
  return (
    <section className='content'>
      <h1 className='title'>Últimas Novedades</h1>
      <div className='main mt-4'>
        <Post day="04" month="Octubre" year="2023" title="Nuevo Oficial de Control">
          <>
            <p>Queremos compartir con ustedes importantes novedades relacionadas con la seguridad en nuestro barrio.</p>
            <div className='more'>
              <p>A partir del 1 de octubre, hemos implementado una serie de cambios que consideramos esenciales para mejorar la seguridad.</p>
              <p>En primer lugar, hemos reemplazado la posición de asesor de seguridad, que anteriormente ocupaba el suboficial Gustavo Ulloa, por la de oficial de control, a cargo del oficial Lucas Ramón Agulles Gaviglio. Una de las diferencias fundamentales es que el oficial de control es designado directamente por el Departamento de Policía Adicional de la provincia de Córdoba, lo que significa que tanto sus ausencias como cualquier ajuste en su salario estarán sujetos a los acuerdos y convenios establecidos por la policía, garantizando una mayor transparencia. Además, es relevante destacar que el rango de oficial es el más alto dentro de la jerarquía policial.</p>
              <p>Las responsabilidades principales de este oficial comprenden:</p>
              <ul className='list-disc'>
                <li>Elaborar informes sobre cualquier anomalía detectada.</li>
                <li>Supervisar el cumplimiento de los protocolos de seguridad por parte de los efectivos y el presentismo del personal.</li>
                <li>Brindar recomendaciones y asesoramiento en materia de seguridad.</li>
                <li>Mantener comunicación continua con la entidad e informar las novedades diarias relacionadas.</li>
                <li>Fiscalizar planillas y designaciones de los efectivos en lo que respecta la tarea administrativa.</li>
              </ul>
              <p>Como segunda medida, tenemos la construcción de un nuevo puesto de seguridad (Puesto 2), ya que el actual no cumple con los requisitos necesarios para funcionar como un puesto fijo. Estamos evaluando un presupuesto que requerirá una inversión significativa.</p>
              <p>Continuaremos informando acerca de los nuevos avances. </p>
            </div>
          </>
        </Post>
        <Post day="26" month="Septiembre" year="2023" title="Reunion Informativa">
          <>
            <p>Queremos expresar nuestro sincero agradecimiento a todos los que asistieron a la reunión, es realmente gratificante ver tanto interés y nos da motivación para seguir mejorando este hermoso barrio. Su presencia es fundamental y apreciada. Nos vamos a contactar con aquellos que desean participar. Algunos otros también quieren participar y vamos a buscar alternativas para los que quieran colaborar aunque sea de manera indirecta.</p>
            <div className='more'>
              <div className='flex flex-wrap'>
                <p className='lg:w-1/2'>En la reunión, abordamos diversos temas, son muchos y no alcanzó el tiempo, lo sabemos; también quedaron cosas que queríamos contar que las vamos a ir canalizando a través de este medio (y por email en un futuro).
                  Primero se presentaron algunas de las problemáticas del barrio y se explicaron los arreglos o cambios en curso y/o en un futuro cercano:</p>
                <div className='lg:w-1/2'><Image src="/img/IMG_9448.jpeg" width="450" height="300" alt="Reunion" className=' border-2 rounded-sm border-primary' /></div>
              </div>
              <ul className='list-disc'>
                <li>Intendencia: reparaciones de grietas en el techo, pintado</li>
                <li>SUM: reparaciones en el techo, pintado</li>
                <li>Puestos 1 - 11 de septiembre: arreglos eléctricos</li>
                <li>Creación de una sala de servidores (mudando la mayor parte del equipamiento sensible que actualmente se encuentra en el puesto 1)</li>
                <li>Canchas de futbol: reparación de tejidos rotos y mejoramiento a través de riego y limitación temporal en su uso.</li>
                <li>Puesto 2: se está presupuestando la creación de un nuevo puesto acorde y cómodo para que el efectivo policial pueda estar de manera permanente.</li>
              </ul>

              <div className='flex flex-wrap justify-between'>
                <div className='lg:w-1/2'><Image src="/img/IMG_9447.jpeg" width="450" height="300" alt="Reunion" className='border-2 rounded-sm border-primary' /></div>
                <p className='lg:w-1/2'>Además contamos con la presencia de nuestro asesor legal que nos explicó como viene la cobranza de morosos y nos informó del estatuto vigente (que vamos a anexar también por este medio) y de que se está próximo a la aprobación de uno nuevo que modifica/actualiza el vigente acorde a las necesidades actuales del barrio. Este último será puesto a disposición/comunicado a la brevedad para su análisis, y que puedan emitir consideraciones, para finalmente llegar con un proyecto a ser votado en asamblea de accionistas.</p>
              </div>
              <p>Algunos temas que no alcanzamos a mencionar:</p>
              <ul className='list-list-image-[url(checkmark.png)]'>
                <li>Reubicación de la zona de reciclado</li>
              </ul>

              <p>Entre los reclamos más destacados por parte de los vecinos se encontraron la falta de comunicación por parte del directorio y la seguridad en general. Somos optimistas en cuanto a la mejora en estos como en poder integrar a varios de ustedes en alguna de nuestras comisiones que nos permita como grupo lograr agilizar los tiempos de respuestas a los problemas/temas actuales y los que se vayan presentando.<br />
                Si tienen alguna pregunta adicional o desean discutir cualquier aspecto en detalle, no duden en ponerse en contacto con nosotros. Los medios formales son a través de los correos, los ponemos nuevamente a disposición:</p>

              <ul className='list-disc'>
                <li>Directorio: directorio@clarosvillage.org.ar</li>
                <li>Intendente Martin Aguilar: intendencia@clarosvillage.org.ar</li>
                <li>Temas de Seguridad: seguridad@clarosvillage.org.ar</li>
              </ul>

              <p>Teléfonos</p>
              <ul className='list-disc'>
                <li>+351-4029025 - puesto entrada</li>
                <li>+351-4028961 - puesto canchas</li>
              </ul>
              <p>Una vez más, gracias por su asistencia y apoyo. Juntos, vamos a hacer una diferencia significativa en nuestro barrio!</p>
            </div>
          </>
        </Post>
      </div>
    </section>
  )
}
