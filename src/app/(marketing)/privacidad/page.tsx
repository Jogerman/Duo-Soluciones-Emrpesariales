import { Container } from '@/components/ui/Container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad | DUO Soluciones',
  description: 'Política de privacidad y protección de datos de DUO Soluciones Empresariales',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-primary-600 to-primary-900 py-16 text-white">
        <Container>
          <h1 className="text-4xl font-bold md:text-5xl">Política de Privacidad</h1>
          <p className="mt-4 text-xl text-white/90">Última actualización: Octubre 2025</p>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="prose prose-lg max-w-4xl">
            <h2>1. Introducción</h2>
            <p>
              En DUO Soluciones Empresariales, nos comprometemos a proteger su privacidad y
              garantizar la seguridad de su información personal.
            </p>

            <h2>2. Información que Recopilamos</h2>
            <p>Podemos recopilar la siguiente información:</p>
            <ul>
              <li>Nombre y cargo</li>
              <li>Información de contacto (correo electrónico, teléfono)</li>
              <li>Información de la empresa</li>
              <li>Datos de navegación del sitio web</li>
            </ul>

            <h2>3. Cómo Utilizamos su Información</h2>
            <p>Utilizamos la información recopilada para:</p>
            <ul>
              <li>Responder a sus consultas y solicitudes</li>
              <li>Proporcionar nuestros servicios de consultoría</li>
              <li>Mejorar nuestro sitio web y servicios</li>
              <li>Enviar comunicaciones relevantes (con su consentimiento)</li>
            </ul>

            <h2>4. Protección de Datos</h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas para proteger su
              información personal contra acceso no autorizado, pérdida o destrucción.
            </p>

            <h2>5. Compartir Información</h2>
            <p>
              No vendemos, intercambiamos ni transferimos su información personal a terceros sin su
              consentimiento, excepto cuando sea requerido por ley.
            </p>

            <h2>6. Sus Derechos</h2>
            <p>Usted tiene derecho a:</p>
            <ul>
              <li>Acceder a su información personal</li>
              <li>Corregir datos inexactos</li>
              <li>Solicitar la eliminación de sus datos</li>
              <li>Oponerse al procesamiento de sus datos</li>
            </ul>

            <h2>7. Cookies</h2>
            <p>
              Utilizamos cookies para mejorar su experiencia en nuestro sitio web. Puede configurar
              su navegador para rechazar cookies, aunque esto puede afectar algunas funcionalidades
              del sitio.
            </p>

            <h2>8. Contacto</h2>
            <p>
              Para ejercer sus derechos o realizar consultas sobre esta política de privacidad:
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
