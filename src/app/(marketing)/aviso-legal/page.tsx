import { Container } from '@/components/ui/Container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso Legal | DUO Soluciones',
  description: 'Aviso legal de DUO Soluciones Empresariales',
}

export default function LegalNoticePage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-primary-600 to-primary-900 py-16 text-white">
        <Container>
          <h1 className="text-4xl font-bold md:text-5xl">Aviso Legal</h1>
          <p className="mt-4 text-xl text-white/90">Información legal y corporativa</p>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="prose prose-lg max-w-4xl">
            <h2>1. Datos Identificativos</h2>
            <p>
              <strong>Razón Social:</strong> DUO Soluciones Empresariales
              <br />
              <strong>Actividad:</strong> Consultoría Empresarial
              <br />
              <strong>Dirección:</strong> Santo Domingo, República Dominicana
              <br />
              <strong>Email:</strong> info@duosoluciones.com.do
              <br />
              <strong>Teléfono:</strong> +1 (809) 555-1234
            </p>

            <h2>2. Objeto del Sitio Web</h2>
            <p>
              Este sitio web tiene como objetivo proporcionar información sobre los servicios de
              consultoría empresarial de DUO Soluciones Empresariales, incluyendo:
            </p>
            <ul>
              <li>Desarrollo Organizacional</li>
              <li>Mejora de Procesos</li>
              <li>Implementación de ERP</li>
              <li>Gobernanza Corporativa</li>
            </ul>

            <h2>3. Condiciones de Uso</h2>
            <p>
              El acceso y uso de este sitio web está sujeto a los términos y condiciones
              establecidos en este aviso legal. Al acceder al sitio, usted acepta cumplir con estas
              condiciones.
            </p>

            <h2>4. Responsabilidad</h2>
            <p>
              DUO Soluciones Empresariales se esfuerza por mantener la información de este sitio web
              actualizada y precisa. Sin embargo, no garantiza la exactitud, integridad o actualidad
              de la información proporcionada.
            </p>

            <h2>5. Propiedad Intelectual e Industrial</h2>
            <p>
              Todos los contenidos de este sitio web, incluyendo textos, imágenes, diseños,
              logotipos y código fuente, son propiedad de DUO Soluciones Empresariales o de terceros
              que han autorizado su uso.
            </p>

            <h2>6. Enlaces a Terceros</h2>
            <p>
              Este sitio web puede contener enlaces a sitios web de terceros. DUO Soluciones
              Empresariales no se responsabiliza del contenido o las prácticas de privacidad de
              dichos sitios.
            </p>

            <h2>7. Ley Aplicable y Jurisdicción</h2>
            <p>
              Este aviso legal se rige por las leyes de la República Dominicana. Para cualquier
              controversia, las partes se someten a los tribunales de Santo Domingo.
            </p>

            <h2>8. Contacto</h2>
            <p>
              Para cualquier consulta relacionada con este aviso legal, puede contactarnos en:
              <br />
              Email: info@duosoluciones.com.do
              <br />
              Teléfono: +1 (809) 555-1234
            </p>
          </div>
        </Container>
      </section>
    </div>
  )
}
