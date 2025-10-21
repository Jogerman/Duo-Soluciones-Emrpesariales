import { Container } from '@/components/ui/Container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | DUO Soluciones',
  description: 'Términos y condiciones de uso de DUO Soluciones Empresariales',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-primary-600 to-primary-900 py-16 text-white">
        <Container>
          <h1 className="text-4xl font-bold md:text-5xl">Términos y Condiciones</h1>
          <p className="mt-4 text-xl text-white/90">Última actualización: Octubre 2025</p>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="prose prose-lg max-w-4xl">
            <h2>1. Aceptación de los Términos</h2>
            <p>
              Al acceder y utilizar el sitio web de DUO Soluciones Empresariales, usted acepta estar
              sujeto a estos términos y condiciones de uso.
            </p>

            <h2>2. Servicios</h2>
            <p>
              DUO Soluciones Empresariales ofrece servicios de consultoría empresarial incluyendo
              desarrollo organizacional, mejora de procesos, implementación de ERP y gobernanza
              corporativa.
            </p>

            <h2>3. Propiedad Intelectual</h2>
            <p>
              Todo el contenido presente en este sitio web, incluyendo textos, gráficos, logotipos,
              imágenes y software, es propiedad de DUO Soluciones Empresariales y está protegido por
              las leyes de propiedad intelectual.
            </p>

            <h2>4. Uso Aceptable</h2>
            <p>
              Los usuarios se comprometen a utilizar este sitio web únicamente con fines lícitos y
              de manera que no infrinja los derechos de terceros.
            </p>

            <h2>5. Limitación de Responsabilidad</h2>
            <p>
              DUO Soluciones Empresariales no se hace responsable de daños directos, indirectos,
              incidentales o consecuentes que puedan surgir del uso o la imposibilidad de uso de
              este sitio web.
            </p>

            <h2>6. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de modificar estos términos y condiciones en cualquier
              momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el
              sitio web.
            </p>

            <h2>7. Contacto</h2>
            <p>
              Para cualquier pregunta sobre estos términos y condiciones, puede contactarnos en:
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
