import { Container } from '@/components/ui/Container'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Aviso Legal | DUO Soluciones Empresariales',
  description:
    'Aviso legal e información corporativa de DUO Soluciones Empresariales. Consultoría empresarial en República Dominicana.',
  robots: 'index, follow',
}

export default function LegalNoticePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-900 py-16 text-white">
        <Container>
          <h1 className="text-4xl font-bold md:text-5xl">Aviso Legal</h1>
          <p className="mt-4 text-xl text-white/90">
            Información legal y corporativa de DUO Soluciones Empresariales
          </p>
          <p className="mt-2 text-lg text-white/80">Última actualización: 23 de octubre de 2025</p>
        </Container>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <div className="rounded-lg bg-primary-50 p-6 border border-primary-200 mb-8">
                <p className="text-gray-800 leading-relaxed mb-0">
                  En cumplimiento de la legislación vigente en la República Dominicana, incluyendo la
                  Ley 126-02 sobre Comercio Electrónico, Documentos y Firmas Digitales, y la Ley
                  172-13 sobre Protección de Datos Personales, DUO Soluciones Empresariales pone a
                  disposición de los usuarios la siguiente información legal sobre la titularidad,
                  operación y condiciones de uso de este sitio web.
                </p>
              </div>

              {/* Table of Contents */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-4">Índice de Contenidos</h2>
                <ol className="space-y-2 mb-0">
                  <li>
                    <a href="#identificacion" className="text-primary-600 hover:text-primary-800">
                      Identificación del Titular
                    </a>
                  </li>
                  <li>
                    <a href="#objeto" className="text-primary-600 hover:text-primary-800">
                      Objeto del Sitio Web
                    </a>
                  </li>
                  <li>
                    <a href="#servicios" className="text-primary-600 hover:text-primary-800">
                      Servicios Profesionales Ofrecidos
                    </a>
                  </li>
                  <li>
                    <a href="#propiedad" className="text-primary-600 hover:text-primary-800">
                      Propiedad Intelectual e Industrial
                    </a>
                  </li>
                  <li>
                    <a href="#condiciones" className="text-primary-600 hover:text-primary-800">
                      Condiciones de Acceso y Uso
                    </a>
                  </li>
                  <li>
                    <a href="#responsabilidad" className="text-primary-600 hover:text-primary-800">
                      Limitación de Responsabilidad
                    </a>
                  </li>
                  <li>
                    <a href="#enlaces" className="text-primary-600 hover:text-primary-800">
                      Política de Enlaces
                    </a>
                  </li>
                  <li>
                    <a href="#proteccion-datos" className="text-primary-600 hover:text-primary-800">
                      Protección de Datos Personales
                    </a>
                  </li>
                  <li>
                    <a href="#certificaciones" className="text-primary-600 hover:text-primary-800">
                      Certificaciones y Membresías Profesionales
                    </a>
                  </li>
                  <li>
                    <a href="#ley" className="text-primary-600 hover:text-primary-800">
                      Legislación Aplicable y Jurisdicción
                    </a>
                  </li>
                  <li>
                    <a href="#modificaciones" className="text-primary-600 hover:text-primary-800">
                      Modificaciones
                    </a>
                  </li>
                  <li>
                    <a href="#contacto" className="text-primary-600 hover:text-primary-800">
                      Datos de Contacto
                    </a>
                  </li>
                </ol>
              </div>

              {/* Section 1 */}
              <h2 id="identificacion" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                1. Identificación del Titular
              </h2>
              <p>
                De conformidad con la legislación dominicana, se informa que el titular y responsable
                del sitio web <strong>https://duo-soluciones.com</strong> es:
              </p>

              <div className="bg-gray-50 rounded-lg p-6 my-6 border-l-4 border-primary-600">
                <h3 className="text-xl font-semibold text-gray-900 mt-0 mb-4">
                  Datos Corporativos
                </h3>
                <p className="mb-2">
                  <strong>Denominación Social:</strong> DUO Soluciones Empresariales
                </p>
                <p className="mb-2">
                  <strong>Nombre Comercial:</strong> DUO Soluciones
                </p>
                <p className="mb-2">
                  <strong>RNC (Registro Nacional de Contribuyentes):</strong>{' '}
                  <span className="text-primary-700">[A ser completado por el cliente]</span>
                </p>
                <p className="mb-2">
                  <strong>Forma Jurídica:</strong>{' '}
                  <span className="text-primary-700">
                    [A ser completado - ej: Sociedad de Responsabilidad Limitada (SRL)]
                  </span>
                </p>
                <p className="mb-2">
                  <strong>Registro Mercantil:</strong>{' '}
                  <span className="text-primary-700">
                    [A ser completado - Cámara de Comercio y Producción, Santo Domingo]
                  </span>
                </p>
                <p className="mb-2">
                  <strong>Actividad Principal:</strong> Servicios de consultoría empresarial,
                  desarrollo organizacional, implementación de sistemas ERP y gobernanza corporativa
                </p>
                <p className="mb-2">
                  <strong>CIIU/NAICS:</strong>{' '}
                  <span className="text-primary-700">
                    [A ser completado - Clasificación Industrial Internacional Uniforme]
                  </span>
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 my-6">
                <h3 className="text-xl font-semibold text-gray-900 mt-0 mb-4">
                  Domicilio y Contacto
                </h3>
                <p className="mb-2">
                  <strong>Dirección Fiscal y Postal:</strong>
                  <br />
                  Santo Domingo, República Dominicana
                  <br />
                  <span className="text-primary-700">
                    [Dirección completa a ser completada por el cliente]
                  </span>
                </p>
                <p className="mb-2">
                  <strong>Correo Electrónico:</strong>{' '}
                  <a
                    href="mailto:info@duosoluciones.com.do"
                    className="text-primary-600 hover:text-primary-800"
                  >
                    info@duosoluciones.com.do
                  </a>
                </p>
                <p className="mb-2">
                  <strong>Teléfono Principal:</strong>{' '}
                  <a href="tel:+18095551234" className="text-primary-600 hover:text-primary-800">
                    +1 (809) 555-1234
                  </a>
                </p>
                <p className="mb-2">
                  <strong>Sitio Web:</strong>{' '}
                  <a
                    href="https://duo-soluciones.com"
                    className="text-primary-600 hover:text-primary-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://duo-soluciones.com
                  </a>
                </p>
                <p className="mb-0">
                  <strong>Horario de Atención:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM (hora
                  local - AST)
                </p>
              </div>

              {/* Section 2 */}
              <h2 id="objeto" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                2. Objeto del Sitio Web
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.1 Finalidad Principal</h3>
              <p>
                Este sitio web tiene como objeto principal proporcionar información sobre los
                servicios profesionales de consultoría empresarial ofrecidos por DUO Soluciones
                Empresariales, así como facilitar la comunicación con potenciales y actuales clientes,
                colaboradores y público interesado.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                2.2 Contenidos Disponibles
              </h3>
              <p>A través de este sitio web, los usuarios pueden:</p>
              <ul>
                <li>
                  <strong>Informarse</strong> sobre nuestros servicios de consultoría empresarial,
                  metodologías, casos de éxito y equipo profesional
                </li>
                <li>
                  <strong>Acceder</strong> a contenido educativo y recursos sobre mejores prácticas
                  empresariales a través de nuestro blog
                </li>
                <li>
                  <strong>Escuchar</strong> nuestro podcast especializado en transformación
                  organizacional y gestión empresarial
                </li>
                <li>
                  <strong>Suscribirse</strong> a nuestro boletín informativo (newsletter) con
                  insights y tendencias del sector
                </li>
                <li>
                  <strong>Solicitar</strong> información, consultas o presupuestos a través de los
                  formularios de contacto disponibles
                </li>
                <li>
                  <strong>Conocer</strong> información corporativa, ética profesional y políticas de
                  la empresa
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                2.3 Carácter Informativo
              </h3>
              <p>
                <strong>Importante:</strong> La información contenida en este sitio web tiene
                carácter <strong>meramente informativo y divulgativo</strong>. No constituye una
                oferta vinculante, asesoramiento profesional específico ni recomendación de actuación
                para casos concretos. Para obtener asesoramiento personalizado, le recomendamos
                contactarnos directamente mediante los canales de comunicación disponibles.
              </p>

              {/* Section 3 */}
              <h2 id="servicios" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                3. Servicios Profesionales Ofrecidos
              </h2>
              <p>
                DUO Soluciones Empresariales es una firma de consultoría especializada en
                transformación organizacional y mejora empresarial. Nuestros servicios principales
                incluyen:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3.1 Desarrollo Organizacional
              </h3>
              <ul>
                <li>Diseño y rediseño de estructuras organizacionales</li>
                <li>Desarrollo de cultura empresarial y valores organizacionales</li>
                <li>Gestión del cambio organizacional</li>
                <li>Desarrollo de liderazgo y capacidades directivas</li>
                <li>Gestión de talento humano y diseño de roles</li>
                <li>Evaluación y desarrollo de clima laboral</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.2 Mejora de Procesos</h3>
              <ul>
                <li>Mapeo, documentación y optimización de procesos de negocio (BPM)</li>
                <li>Implementación de metodologías Lean y Six Sigma</li>
                <li>Gestión de proyectos de mejora continua</li>
                <li>Rediseño de procesos operativos y administrativos</li>
                <li>Medición de eficiencia operacional (KPIs, tableros de control)</li>
                <li>Automatización de procesos empresariales (BPA)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3.3 Implementación de ERP y Tecnología Empresarial
              </h3>
              <ul>
                <li>
                  Implementación y personalización de <strong>Microsoft Dynamics 365</strong>{' '}
                  (Business Central, Finance & Operations, Customer Engagement)
                </li>
                <li>
                  Desarrollo de soluciones en <strong>Microsoft Power Platform</strong> (Power BI,
                  Power Apps, Power Automate)
                </li>
                <li>Integración de sistemas empresariales (ERP, CRM, BI)</li>
                <li>Migración de datos y transformación digital</li>
                <li>Capacitación y gestión del cambio tecnológico</li>
                <li>Soporte post-implementación y optimización continua</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3.4 Gobernanza Corporativa
              </h3>
              <ul>
                <li>Diseño e implementación de estructuras de gobierno corporativo</li>
                <li>Asesoría a juntas directivas y consejos de administración</li>
                <li>Desarrollo de códigos de ética y políticas corporativas</li>
                <li>Gestión de riesgos empresariales (ERM)</li>
                <li>Cumplimiento normativo y regulatorio (compliance)</li>
                <li>Auditoría interna y control de gestión</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3.5 Modalidades de Servicio
              </h3>
              <p>Nuestros servicios se prestan mediante:</p>
              <ul>
                <li>
                  <strong>Proyectos de Consultoría</strong>: Proyectos con alcance, cronograma y
                  entregables definidos
                </li>
                <li>
                  <strong>Asesoría Continua</strong>: Acompañamiento permanente mediante contratos de
                  retainer
                </li>
                <li>
                  <strong>Formación y Capacitación</strong>: Talleres, cursos y certificaciones
                  especializadas
                </li>
                <li>
                  <strong>Diagnósticos y Evaluaciones</strong>: Estudios específicos de situación
                  actual y recomendaciones
                </li>
                <li>
                  <strong>Implementaciones Tecnológicas</strong>: Proyectos de despliegue de software
                  empresarial
                </li>
              </ul>

              {/* Section 4 */}
              <h2 id="propiedad" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                4. Propiedad Intelectual e Industrial
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                4.1 Titularidad de Derechos
              </h3>
              <p>
                Todos los derechos de propiedad intelectual e industrial del contenido de este sitio
                web, incluyendo pero no limitado a:
              </p>
              <ul>
                <li>Textos, artículos y publicaciones del blog</li>
                <li>Diseño gráfico, interfaz de usuario y elementos visuales</li>
                <li>Imágenes, fotografías e ilustraciones</li>
                <li>Logotipos, marcas comerciales y signos distintivos</li>
                <li>Código fuente, software y aplicaciones</li>
                <li>Bases de datos y compilaciones de información</li>
                <li>Contenido multimedia (podcast, videos)</li>
                <li>Metodologías, modelos y frameworks propietarios</li>
              </ul>
              <p>
                Son propiedad exclusiva de <strong>DUO Soluciones Empresariales</strong> o de sus
                respectivos licenciantes, y están protegidos por la legislación dominicana e
                internacional en materia de propiedad intelectual e industrial, específicamente:
              </p>
              <ul>
                <li>
                  <strong>Ley No. 65-00</strong> sobre Derecho de Autor de República Dominicana
                </li>
                <li>
                  <strong>Ley No. 20-00</strong> sobre Propiedad Industrial
                </li>
                <li>Convenio de Berna para la Protección de Obras Literarias y Artísticas</li>
                <li>
                  Acuerdo sobre los Aspectos de los Derechos de Propiedad Intelectual relacionados
                  con el Comercio (ADPIC/TRIPS)
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.2 Marcas Registradas</h3>
              <p>
                Las siguientes marcas son propiedad de DUO Soluciones Empresariales:
              </p>
              <ul>
                <li>
                  <strong>DUO Soluciones Empresariales</strong> (denominación social)
                </li>
                <li>
                  <strong>DUO Soluciones</strong> (nombre comercial)
                </li>
                <li>
                  <strong>Logotipo DUO</strong> (marca figurativa)
                </li>
                <li>Eslóganes y lemas comerciales asociados a la marca</li>
              </ul>
              <p>
                Queda prohibido el uso de estas marcas sin autorización previa y por escrito de DUO
                Soluciones Empresariales.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                4.3 Marcas de Terceros
              </h3>
              <p>
                Las marcas, nombres comerciales, logotipos y otros signos distintivos de terceros que
                aparecen en este sitio web (tales como Microsoft, Microsoft Dynamics 365, Power BI,
                Power Platform, LinkedIn, Spotify, etc.) son propiedad de sus respectivos titulares y
                se utilizan con fines informativos o bajo licencia, sin que su uso implique relación,
                patrocinio o recomendación por parte de dichos terceros, salvo cuando se indique
                expresamente.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                4.4 Restricciones de Uso
              </h3>
              <p>
                El acceso a este sitio web no confiere a los usuarios ningún derecho de propiedad
                sobre los contenidos y elementos del mismo. Queda expresamente prohibido:
              </p>
              <ul>
                <li>
                  La reproducción, distribución, comunicación pública, transformación o cualquier otra
                  forma de explotación de los contenidos sin autorización previa por escrito
                </li>
                <li>
                  La supresión, alteración, elusión o manipulación de avisos de derechos de autor,
                  marcas o cualquier otro medio de protección
                </li>
                <li>
                  El uso de contenidos con fines comerciales sin licencia expresa
                </li>
                <li>La ingeniería inversa, descompilación o desensamblado del código fuente</li>
                <li>
                  La extracción sistemática de contenidos mediante web scraping, robots o métodos
                  automatizados sin autorización
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.5 Uso Permitido</h3>
              <p>
                Se permite la visualización, descarga temporal e impresión de contenidos del sitio web
                exclusivamente para:
              </p>
              <ul>
                <li>Uso personal, privado y no comercial</li>
                <li>Uso educativo o de investigación académica (con cita de la fuente)</li>
                <li>Uso interno de organizaciones que sean clientes de DUO (según acuerdos)</li>
              </ul>
              <p>
                Siempre que se mantengan intactos los avisos de derechos de autor y se cite
                adecuadamente la autoría y fuente.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                4.6 Solicitud de Autorizaciones
              </h3>
              <p>
                Para solicitar autorizaciones de uso que excedan los usos permitidos anteriormente,
                contacte con nosotros en:{' '}
                <a
                  href="mailto:legal@duosoluciones.com.do"
                  className="text-primary-600 hover:text-primary-800"
                >
                  legal@duosoluciones.com.do
                </a>
              </p>

              {/* Section 5 */}
              <h2 id="condiciones" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                5. Condiciones de Acceso y Uso
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.1 Acceso Libre</h3>
              <p>
                El acceso al sitio web es gratuito y no requiere registro previo, salvo para áreas o
                servicios específicos que puedan requerir autenticación (como áreas de clientes,
                descargas premium o funcionalidades especiales).
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                5.2 Uso Responsable
              </h3>
              <p>El usuario se compromete a utilizar el sitio web y sus contenidos de forma:</p>
              <ul>
                <li>
                  <strong>Lícita</strong>: Conforme a la legislación vigente, la moral y el orden
                  público
                </li>
                <li>
                  <strong>Diligente</strong>: Evitando dañar o impedir el normal funcionamiento del
                  sitio
                </li>
                <li>
                  <strong>Respetuosa</strong>: Sin infringir derechos de terceros
                </li>
                <li>
                  <strong>Veraz</strong>: Proporcionando información cierta cuando sea requerida
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.3 Prohibiciones</h3>
              <p>Queda expresamente prohibido:</p>
              <ul>
                <li>
                  Realizar acciones que puedan dañar, inutilizar, sobrecargar o deteriorar el sitio
                  web o impedir su normal utilización
                </li>
                <li>
                  Introducir, difundir o transmitir virus informáticos, malware o cualquier código
                  malicioso
                </li>
                <li>Intentar acceder sin autorización a áreas restringidas del sitio</li>
                <li>
                  Utilizar robots, spiders, scrapers u otros medios automatizados sin consentimiento
                  expreso
                </li>
                <li>
                  Realizar ingeniería inversa, intentar descifrar o descubrir el código fuente
                </li>
                <li>
                  Suplantar la identidad de otro usuario o entidad, o falsear la relación con DUO
                </li>
                <li>
                  Recopilar datos de otros usuarios para fines comerciales no autorizados (spam,
                  phishing)
                </li>
                <li>
                  Publicar o transmitir contenidos ilegales, difamatorios, ofensivos, discriminatorios
                  o que infrinjan derechos de terceros
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                5.4 Suspensión de Acceso
              </h3>
              <p>
                DUO Soluciones Empresariales se reserva el derecho de suspender o denegar, sin previo
                aviso y en cualquier momento, el acceso al sitio web a aquellos usuarios que
                incumplan estas condiciones o realicen un uso indebido del mismo.
              </p>

              {/* Section 6 */}
              <h2 id="responsabilidad" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                6. Limitación de Responsabilidad
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                6.1 Disponibilidad del Sitio
              </h3>
              <p>
                DUO Soluciones Empresariales no garantiza la disponibilidad, continuidad y
                funcionamiento ininterrumpido del sitio web. El acceso puede ser suspendido,
                cancelado o limitado por razones técnicas, de seguridad, mantenimiento, actualización
                o cualquier otra causa ajena a nuestro control.
              </p>
              <p>
                <strong>No seremos responsables por:</strong>
              </p>
              <ul>
                <li>Interrupciones del servicio por mantenimiento programado o de emergencia</li>
                <li>Fallos técnicos en servidores, redes o sistemas ajenos a nuestra gestión</li>
                <li>Ataques informáticos, virus o interferencias de terceros</li>
                <li>Fallos en las conexiones de Internet del usuario</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                6.2 Veracidad y Actualización de Contenidos
              </h3>
              <p>
                Si bien nos esforzamos por mantener la información del sitio web precisa y
                actualizada, DUO Soluciones Empresariales no garantiza:
              </p>
              <ul>
                <li>La exactitud, completitud o actualidad de los contenidos</li>
                <li>La ausencia de errores, omisiones o inexactitudes en la información</li>
                <li>Que los contenidos estén libres de errores técnicos o tipográficos</li>
              </ul>
              <p>
                Los contenidos del sitio web, especialmente los relativos a precios, características
                de servicios y disponibilidad, pueden ser modificados sin previo aviso.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                6.3 Contenidos de Terceros
              </h3>
              <p>
                El sitio web puede contener enlaces, referencias o integración con contenidos de
                terceros (redes sociales, podcasts en Spotify, videos, etc.). DUO Soluciones
                Empresariales <strong>no asume responsabilidad</strong> por:
              </p>
              <ul>
                <li>La legalidad, calidad, veracidad o utilidad de dichos contenidos</li>
                <li>Las políticas de privacidad o términos de uso de sitios de terceros</li>
                <li>Daños derivados del acceso o uso de contenidos enlazados</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                6.4 Uso de la Información
              </h3>
              <p>
                La información proporcionada en el sitio web tiene carácter <strong>informativo y
                educativo</strong>. No constituye asesoramiento profesional vinculante ni
                recomendaciones específicas de actuación. Las decisiones basadas en el contenido del
                sitio son responsabilidad exclusiva del usuario.
              </p>
              <p>
                Para obtener asesoramiento profesional personalizado, recomendamos contactarnos
                directamente para un análisis de su situación particular.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                6.5 Exclusión de Garantías
              </h3>
              <p>
                Salvo lo establecido expresamente en contratos de servicios específicos, DUO
                Soluciones Empresariales proporciona el sitio web "tal cual" y "según disponibilidad",
                sin garantías de ningún tipo, expresas o implícitas.
              </p>

              {/* Section 7 */}
              <h2 id="enlaces" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                7. Política de Enlaces
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                7.1 Enlaces desde Nuestro Sitio
              </h3>
              <p>
                El sitio web puede contener enlaces a sitios web de terceros, incluyendo:
              </p>
              <ul>
                <li>Redes sociales profesionales (LinkedIn, Twitter)</li>
                <li>Plataformas de contenido (Spotify para podcast)</li>
                <li>Socios tecnológicos (Microsoft, etc.)</li>
                <li>Asociaciones profesionales y organizaciones del sector</li>
                <li>Recursos educativos y publicaciones especializadas</li>
              </ul>
              <p>
                La inclusión de estos enlaces tiene fines meramente informativos y <strong>no implica
                aprobación, recomendación o responsabilidad</strong> sobre los contenidos, productos,
                servicios o prácticas de dichos sitios.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                7.2 Enlaces hacia Nuestro Sitio (Deep Linking)
              </h3>
              <p>
                Los enlaces externos hacia este sitio web deben cumplir las siguientes condiciones:
              </p>
              <ul>
                <li>
                  No crear un marco o "frame" que envuelva nuestro sitio (framing prohibido)
                </li>
                <li>No sugerir falsamente una relación de patrocinio, colaboración o afiliación</li>
                <li>No presentar información falsa, inexacta o confusa sobre DUO Soluciones</li>
                <li>No incluir contenidos ilícitos, ofensivos o contrarios a la ética profesional</li>
                <li>No infringir derechos de propiedad intelectual, industrial o privacidad</li>
              </ul>
              <p>
                El establecimiento de enlaces no requiere autorización previa, siempre que se cumplan
                estas condiciones. No obstante, nos reservamos el derecho de solicitar la eliminación
                de enlaces que no cumplan estos criterios.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                7.3 Notificación de Enlaces Inapropiados
              </h3>
              <p>
                Si detecta un enlace roto, inapropiado o infractor en nuestro sitio, le agradeceríamos
                nos lo comunicara a:{' '}
                <a
                  href="mailto:webmaster@duosoluciones.com.do"
                  className="text-primary-600 hover:text-primary-800"
                >
                  webmaster@duosoluciones.com.do
                </a>
              </p>

              {/* Section 8 */}
              <h2 id="proteccion-datos" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                8. Protección de Datos Personales
              </h2>
              <p>
                El tratamiento de datos personales que se realice a través de este sitio web está
                sujeto a lo establecido en nuestra{' '}
                <Link href="/privacidad" className="text-primary-600 hover:text-primary-800">
                  Política de Privacidad
                </Link>
                , que forma parte integral de este Aviso Legal.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                8.1 Normativa Aplicable
              </h3>
              <p>
                DUO Soluciones Empresariales cumple con la normativa de protección de datos aplicable:
              </p>
              <ul>
                <li>
                  <strong>Ley 172-13</strong> sobre Protección de Datos Personales de República
                  Dominicana
                </li>
                <li>
                  <strong>Reglamento General de Protección de Datos (GDPR)</strong> de la Unión
                  Europea (para usuarios europeos)
                </li>
                <li>
                  <strong>California Consumer Privacy Act (CCPA)</strong> para residentes de
                  California
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                8.2 Datos Recopilados
              </h3>
              <p>
                A través del sitio web podemos recopilar:
              </p>
              <ul>
                <li>Datos de contacto proporcionados voluntariamente en formularios</li>
                <li>Información de suscripción a newsletter</li>
                <li>Datos de navegación y uso del sitio mediante cookies</li>
                <li>Comunicaciones enviadas por correo electrónico</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8.3 Derechos del Usuario</h3>
              <p>
                Los usuarios tienen derecho a acceder, rectificar, cancelar, oponerse y ejercer sus
                demás derechos de protección de datos. Para más información, consulte nuestra{' '}
                <Link href="/privacidad" className="text-primary-600 hover:text-primary-800">
                  Política de Privacidad
                </Link>
                .
              </p>

              {/* Section 9 */}
              <h2 id="certificaciones" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                9. Certificaciones y Membresías Profesionales
              </h2>
              <p>
                DUO Soluciones Empresariales cuenta con las siguientes certificaciones, acreditaciones
                y membresías profesionales que respaldan la calidad de nuestros servicios:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                9.1 Certificaciones Técnicas
              </h3>
              <ul>
                <li>
                  <strong>Microsoft Partner</strong>: Socio certificado de Microsoft con
                  especialización en Business Applications
                  <br />
                  <span className="text-sm text-gray-600">
                    [Nivel de partnership a ser completado - ej: Gold Partner, Solutions Partner]
                  </span>
                </li>
                <li>
                  <strong>Microsoft Certified Professionals</strong>: Consultores certificados en
                  Dynamics 365, Power Platform y Azure
                </li>
                <li>
                  <strong>Project Management Professional (PMP)</strong>: Certificaciones PMI en
                  gestión de proyectos
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                9.2 Certificaciones en Metodologías
              </h3>
              <ul>
                <li>
                  <strong>Lean Six Sigma</strong>: Certificaciones Black Belt y Green Belt en
                  optimización de procesos
                </li>
                <li>
                  <strong>SAFe (Scaled Agile Framework)</strong>: Certificaciones en metodologías
                  ágiles escaladas
                </li>
                <li>
                  <strong>Scrum Master Certified (CSM)</strong>: Certificaciones oficiales de Scrum
                  Alliance
                </li>
                <li>
                  <strong>Business Process Management (BPM)</strong>: Certificaciones ABPMP en gestión
                  de procesos
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                9.3 Membresías Profesionales
              </h3>
              <ul>
                <li>
                  <strong>Project Management Institute (PMI)</strong>: Miembro activo y en buena
                  reputación
                </li>
                <li>
                  <strong>Cámara de Comercio y Producción</strong> de Santo Domingo, República
                  Dominicana
                </li>
                <li>
                  <strong>Asociaciones Profesionales</strong>:{' '}
                  <span className="text-sm text-gray-600">
                    [A completar - ej: APQC, ISACA, asociaciones locales]
                  </span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">9.4 Seguro Profesional</h3>
              <p>
                <span className="text-primary-700">
                  [A ser completado por el cliente si aplica]
                </span>
                <br />
                DUO Soluciones Empresariales cuenta con seguro de responsabilidad profesional que
                cubre los servicios de consultoría prestados, emitido por [Compañía Aseguradora],
                póliza No. [XXXXX].
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                9.5 Verificación de Certificaciones
              </h3>
              <p>
                Para verificar nuestras certificaciones y membresías, puede:
              </p>
              <ul>
                <li>
                  Consultar el{' '}
                  <a
                    href="https://partner.microsoft.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-800"
                  >
                    Microsoft Partner Center
                  </a>
                </li>
                <li>Solicitar copia de certificados actualizados a nuestro equipo</li>
                <li>
                  Contactarnos para cualquier consulta sobre credenciales profesionales:{' '}
                  <a
                    href="mailto:info@duosoluciones.com.do"
                    className="text-primary-600 hover:text-primary-800"
                  >
                    info@duosoluciones.com.do
                  </a>
                </li>
              </ul>

              {/* Section 10 */}
              <h2 id="ley" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                10. Legislación Aplicable y Jurisdicción
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">10.1 Ley Aplicable</h3>
              <p>
                Este Aviso Legal se rige por la legislación de la{' '}
                <strong>República Dominicana</strong>, específicamente:
              </p>
              <ul>
                <li>
                  <strong>Ley No. 126-02</strong> sobre Comercio Electrónico, Documentos y Firmas
                  Digitales
                </li>
                <li>
                  <strong>Ley No. 172-13</strong> sobre Protección de Datos Personales
                </li>
                <li>
                  <strong>Ley No. 65-00</strong> sobre Derecho de Autor
                </li>
                <li>
                  <strong>Ley No. 20-00</strong> sobre Propiedad Industrial
                </li>
                <li>
                  <strong>Código Civil</strong> y <strong>Código de Comercio</strong> de República
                  Dominicana
                </li>
                <li>Demás normativa mercantil y civil dominicana aplicable</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">10.2 Jurisdicción</h3>
              <p>
                Para la resolución de cualquier controversia o conflicto que pudiera derivarse del
                acceso o uso de este sitio web, así como de la interpretación o aplicación de este
                Aviso Legal, las partes se someten expresamente a la jurisdicción de los{' '}
                <strong>Tribunales competentes de Santo Domingo, República Dominicana</strong>,
                renunciando a cualquier otro fuero que pudiera corresponderles.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                10.3 Resolución Alternativa de Conflictos
              </h3>
              <p>
                Sin perjuicio de lo anterior, DUO Soluciones Empresariales promueve la resolución
                amistosa de controversias mediante:
              </p>
              <ul>
                <li>
                  <strong>Negociación directa</strong>: Como primera vía de resolución de disputas
                </li>
                <li>
                  <strong>Mediación</strong>: Ante centros de mediación reconocidos en Santo Domingo
                </li>
                <li>
                  <strong>Arbitraje</strong>: Ante centros de arbitraje comercial según sea acordado
                  entre las partes
                </li>
              </ul>

              {/* Section 11 */}
              <h2 id="modificaciones" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                11. Modificaciones
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                11.1 Derecho de Modificación
              </h3>
              <p>
                DUO Soluciones Empresariales se reserva el derecho de modificar, en cualquier momento
                y sin previo aviso:
              </p>
              <ul>
                <li>El diseño, presentación, configuración y contenidos del sitio web</li>
                <li>Los servicios, productos o contenidos ofrecidos</li>
                <li>Las condiciones de acceso y uso</li>
                <li>Este Aviso Legal y documentos relacionados</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                11.2 Notificación de Cambios
              </h3>
              <p>
                Las modificaciones a este Aviso Legal entrarán en vigor desde su publicación en el
                sitio web. Se recomienda revisar periódicamente este documento para estar informado de
                cualquier cambio.
              </p>
              <p>
                Para cambios sustanciales que afecten los derechos de los usuarios, se publicará un
                aviso destacado en el sitio web y se actualizará la fecha de "Última actualización".
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                11.3 Aceptación de Modificaciones
              </h3>
              <p>
                El uso continuado del sitio web tras la publicación de modificaciones implica la
                aceptación tácita de las nuevas condiciones. Si no está de acuerdo con las
                modificaciones, debe cesar el uso del sitio web.
              </p>

              {/* Section 12 */}
              <h2 id="contacto" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                12. Datos de Contacto
              </h2>
              <p>
                Para cualquier consulta, sugerencia, notificación de incidencias o ejercicio de
                derechos relacionados con este sitio web y su contenido, puede contactarnos a través
                de los siguientes medios:
              </p>

              <div className="bg-gray-50 rounded-lg p-6 my-6 border-l-4 border-primary-600">
                <h3 className="text-xl font-semibold text-gray-900 mt-0 mb-4">
                  Información de Contacto
                </h3>
                <p className="mb-2">
                  <strong>Atención al Cliente:</strong>
                  <br />
                  Email:{' '}
                  <a
                    href="mailto:info@duosoluciones.com.do"
                    className="text-primary-600 hover:text-primary-800"
                  >
                    info@duosoluciones.com.do
                  </a>
                  <br />
                  Teléfono:{' '}
                  <a href="tel:+18095551234" className="text-primary-600 hover:text-primary-800">
                    +1 (809) 555-1234
                  </a>
                </p>
                <p className="mb-2">
                  <strong>Departamento Legal:</strong>
                  <br />
                  Email:{' '}
                  <a
                    href="mailto:legal@duosoluciones.com.do"
                    className="text-primary-600 hover:text-primary-800"
                  >
                    legal@duosoluciones.com.do
                  </a>
                </p>
                <p className="mb-2">
                  <strong>Protección de Datos:</strong>
                  <br />
                  Email:{' '}
                  <a
                    href="mailto:dpo@duosoluciones.com.do"
                    className="text-primary-600 hover:text-primary-800"
                  >
                    dpo@duosoluciones.com.do
                  </a>
                </p>
                <p className="mb-2">
                  <strong>Soporte Técnico Web:</strong>
                  <br />
                  Email:{' '}
                  <a
                    href="mailto:webmaster@duosoluciones.com.do"
                    className="text-primary-600 hover:text-primary-800"
                  >
                    webmaster@duosoluciones.com.do
                  </a>
                </p>
                <p className="mb-0">
                  <strong>Horario de Atención:</strong>
                  <br />
                  Lunes a Viernes: 9:00 AM - 6:00 PM (AST - Hora del Atlántico)
                  <br />
                  Sábados, Domingos y Festivos: Cerrado (con atención de emergencias para clientes)
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 my-6 border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold text-blue-900 mt-0 mb-4">
                  Dirección Postal y Oficinas
                </h3>
                <p className="mb-2 text-blue-800">
                  <strong>Oficina Principal:</strong>
                  <br />
                  Santo Domingo, República Dominicana
                  <br />
                  <span className="text-blue-600">
                    [Dirección completa con calle, número, edificio, piso, código postal a ser
                    completada]
                  </span>
                </p>
                <p className="mb-0 text-blue-800">
                  Para envíos de documentación legal, certificados o correspondencia oficial, utilice
                  la dirección postal completa indicada arriba.
                </p>
              </div>

              {/* Footer Links */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Documentos Legales Relacionados
                </h3>
                <ul className="space-y-2 list-none pl-0">
                  <li>
                    <Link href="/terminos" className="text-primary-600 hover:text-primary-800 text-lg">
                      → Términos y Condiciones de Uso
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacidad"
                      className="text-primary-600 hover:text-primary-800 text-lg"
                    >
                      → Política de Privacidad y Protección de Datos
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-primary-600 hover:text-primary-800 text-lg">
                      → Formulario de Contacto
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Important Information Box */}
              <div className="mt-8 p-6 bg-amber-50 border-l-4 border-amber-500 rounded">
                <h3 className="text-lg font-semibold text-amber-900 mt-0 mb-3">
                  Información Importante para el Cliente
                </h3>
                <p className="text-sm text-amber-800 mb-2">
                  <strong>Campos pendientes de completar:</strong>
                </p>
                <ul className="text-sm text-amber-800 mb-0 space-y-1">
                  <li>• RNC (Registro Nacional de Contribuyentes)</li>
                  <li>• Forma jurídica específica (SRL, SA, etc.)</li>
                  <li>• Número de registro mercantil</li>
                  <li>• Código CIIU/NAICS de clasificación industrial</li>
                  <li>• Dirección fiscal completa con código postal</li>
                  <li>• Nivel de Microsoft Partnership (Gold, Solutions Partner, etc.)</li>
                  <li>• Información de seguro de responsabilidad profesional (si aplica)</li>
                  <li>• Membresías profesionales adicionales</li>
                </ul>
              </div>

              {/* Validity Statement */}
              <div className="mt-8 p-6 bg-primary-50 border-l-4 border-primary-600 rounded">
                <p className="text-sm text-gray-700 mb-0">
                  <strong>Validez y Vigencia:</strong> Este Aviso Legal permanecerá en vigor mientras
                  el sitio web esté accesible al público. Las condiciones aquí establecidas podrán
                  ser modificadas en cualquier momento, siendo de aplicación la versión más
                  actualizada publicada en el sitio web. Fecha de última actualización:{' '}
                  <strong>23 de octubre de 2025</strong>.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
