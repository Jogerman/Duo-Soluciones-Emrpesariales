import { Container } from '@/components/ui/Container'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidad | DUO Soluciones Empresariales',
  description:
    'Política de privacidad y protección de datos de DUO Soluciones Empresariales. Cumplimiento con GDPR, CCPA y Ley 172-13 de República Dominicana.',
  robots: 'index, follow',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-900 py-16 text-white">
        <Container>
          <h1 className="text-4xl font-bold md:text-5xl">Política de Privacidad</h1>
          <p className="mt-4 text-xl text-white/90">Última actualización: 23 de octubre de 2025</p>
          <p className="mt-2 text-lg text-white/80">
            Cumplimiento: GDPR, CCPA y Ley 172-13 (República Dominicana)
          </p>
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
                  En <strong>DUO Soluciones Empresariales</strong>, nos tomamos muy en serio su
                  privacidad y la protección de sus datos personales. Esta Política de Privacidad
                  describe cómo recopilamos, usamos, almacenamos y protegemos su información cuando
                  utiliza nuestro sitio web <strong>https://duo-soluciones.com</strong> y nuestros
                  servicios. Nos comprometemos a cumplir con las leyes de protección de datos
                  aplicables, incluyendo el GDPR (Reglamento General de Protección de Datos de la UE),
                  CCPA (Ley de Privacidad del Consumidor de California) y la Ley 172-13 sobre
                  Protección de Datos Personales de República Dominicana.
                </p>
              </div>

              {/* Table of Contents */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-4">Índice de Contenidos</h2>
                <ol className="space-y-2 mb-0">
                  <li>
                    <a href="#controlador" className="text-primary-600 hover:text-primary-800">
                      Controlador de Datos e Información de Contacto
                    </a>
                  </li>
                  <li>
                    <a href="#datos-recopilados" className="text-primary-600 hover:text-primary-800">
                      Datos que Recopilamos
                    </a>
                  </li>
                  <li>
                    <a href="#uso-datos" className="text-primary-600 hover:text-primary-800">
                      Cómo Utilizamos sus Datos
                    </a>
                  </li>
                  <li>
                    <a href="#base-legal" className="text-primary-600 hover:text-primary-800">
                      Base Legal para el Procesamiento (GDPR)
                    </a>
                  </li>
                  <li>
                    <a href="#compartir" className="text-primary-600 hover:text-primary-800">
                      Compartir Información con Terceros
                    </a>
                  </li>
                  <li>
                    <a href="#cookies" className="text-primary-600 hover:text-primary-800">
                      Cookies y Tecnologías de Seguimiento
                    </a>
                  </li>
                  <li>
                    <a href="#derechos" className="text-primary-600 hover:text-primary-800">
                      Sus Derechos de Privacidad
                    </a>
                  </li>
                  <li>
                    <a href="#retencion" className="text-primary-600 hover:text-primary-800">
                      Retención de Datos
                    </a>
                  </li>
                  <li>
                    <a href="#seguridad" className="text-primary-600 hover:text-primary-800">
                      Seguridad de Datos
                    </a>
                  </li>
                  <li>
                    <a href="#transferencias" className="text-primary-600 hover:text-primary-800">
                      Transferencias Internacionales de Datos
                    </a>
                  </li>
                  <li>
                    <a href="#menores" className="text-primary-600 hover:text-primary-800">
                      Privacidad de Menores
                    </a>
                  </li>
                  <li>
                    <a href="#ccpa" className="text-primary-600 hover:text-primary-800">
                      Derechos Específicos CCPA (California)
                    </a>
                  </li>
                  <li>
                    <a href="#cambios" className="text-primary-600 hover:text-primary-800">
                      Cambios a esta Política
                    </a>
                  </li>
                  <li>
                    <a href="#contacto" className="text-primary-600 hover:text-primary-800">
                      Contacto y Ejercicio de Derechos
                    </a>
                  </li>
                </ol>
              </div>

              {/* Section 1 */}
              <h2 id="controlador" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                1. Controlador de Datos e Información de Contacto
              </h2>
              <p>
                El controlador de datos responsable del procesamiento de su información personal es:
              </p>
              <div className="bg-gray-50 rounded-lg p-6 my-6">
                <p className="mb-2">
                  <strong>Nombre Legal:</strong> DUO Soluciones Empresariales
                </p>
                <p className="mb-2">
                  <strong>RNC (Registro Nacional de Contribuyentes):</strong> [A ser completado por el
                  cliente]
                </p>
                <p className="mb-2">
                  <strong>Dirección:</strong> Santo Domingo, República Dominicana
                </p>
                <p className="mb-2">
                  <strong>Email:</strong>{' '}
                  <a
                    href="mailto:info@duosoluciones.com.do"
                    className="text-primary-600 hover:text-primary-800"
                  >
                    info@duosoluciones.com.do
                  </a>
                </p>
                <p className="mb-2">
                  <strong>Teléfono:</strong>{' '}
                  <a href="tel:+18095551234" className="text-primary-600 hover:text-primary-800">
                    +1 (809) 555-1234
                  </a>
                </p>
                <p className="mb-0">
                  <strong>Oficial de Protección de Datos (DPO):</strong>{' '}
                  <a
                    href="mailto:dpo@duosoluciones.com.do"
                    className="text-primary-600 hover:text-primary-800"
                  >
                    dpo@duosoluciones.com.do
                  </a>
                </p>
              </div>

              {/* Section 2 */}
              <h2 id="datos-recopilados" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                2. Datos que Recopilamos
              </h2>
              <p>
                Recopilamos diferentes tipos de información dependiendo de cómo interactúe con nuestro
                sitio web y servicios:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                2.1 Información que Usted Proporciona Directamente
              </h3>
              <p>
                Cuando utiliza nuestros servicios o se comunica con nosotros, podemos recopilar:
              </p>
              <ul>
                <li>
                  <strong>Información de Contacto</strong>: Nombre completo, cargo, nombre de empresa,
                  correo electrónico, número de teléfono, dirección postal
                </li>
                <li>
                  <strong>Información de Consulta</strong>: Detalles sobre su empresa, necesidades de
                  consultoría, presupuesto, industria, tamaño de organización
                </li>
                <li>
                  <strong>Suscripciones</strong>: Dirección de correo electrónico para newsletter,
                  preferencias de comunicación
                </li>
                <li>
                  <strong>Información de Cuenta</strong>: Credenciales de acceso, preferencias de
                  usuario (si aplica)
                </li>
                <li>
                  <strong>Comunicaciones</strong>: Contenido de correos electrónicos, mensajes,
                  comentarios o feedback que nos envíe
                </li>
                <li>
                  <strong>Información de Pago</strong>: Datos de facturación (procesados de forma
                  segura a través de procesadores de pago terceros)
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                2.2 Información Recopilada Automáticamente
              </h3>
              <p>
                Cuando visita nuestro sitio web, recopilamos automáticamente cierta información
                mediante cookies y tecnologías similares:
              </p>
              <ul>
                <li>
                  <strong>Información del Dispositivo</strong>: Tipo de dispositivo, sistema operativo,
                  navegador, versión de navegador, identificadores únicos del dispositivo
                </li>
                <li>
                  <strong>Información de Uso</strong>: Páginas visitadas, tiempo en cada página,
                  enlaces clicados, fecha y hora de visita, URL de referencia
                </li>
                <li>
                  <strong>Información de Ubicación</strong>: Dirección IP, ubicación geográfica
                  aproximada basada en IP, zona horaria
                </li>
                <li>
                  <strong>Datos Analíticos</strong>: Datos agregados sobre comportamiento de
                  navegación, interacciones con contenido, tasas de conversión
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                2.3 Información de Fuentes Terceras
              </h3>
              <p>Podemos recibir información adicional de fuentes públicas o terceros:</p>
              <ul>
                <li>
                  <strong>Redes Sociales</strong>: Información de perfil público de LinkedIn si
                  interactúa con nuestro contenido
                </li>
                <li>
                  <strong>Bases de Datos Comerciales</strong>: Información empresarial verificada de
                  registros públicos
                </li>
                <li>
                  <strong>Socios de Negocio</strong>: Información compartida por Microsoft u otros
                  socios tecnológicos cuando sea relevante para nuestros servicios
                </li>
              </ul>

              {/* Section 3 */}
              <h2 id="uso-datos" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                3. Cómo Utilizamos sus Datos
              </h2>
              <p>
                Utilizamos la información recopilada para los siguientes propósitos legítimos:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3.1 Prestación de Servicios
              </h3>
              <ul>
                <li>Responder a sus consultas y solicitudes de información</li>
                <li>Proporcionar servicios de consultoría empresarial contratados</li>
                <li>Procesar y gestionar proyectos de implementación de ERP</li>
                <li>Facilitar comunicaciones relacionadas con proyectos activos</li>
                <li>Proporcionar soporte técnico y atención al cliente</li>
                <li>Gestionar cuentas de usuario y autenticación (si aplica)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3.2 Comunicaciones de Marketing (con su consentimiento)
              </h3>
              <ul>
                <li>Enviar newsletter con insights empresariales y mejores prácticas</li>
                <li>Notificar sobre nuevos episodios de podcast y contenido de blog</li>
                <li>Compartir invitaciones a webinars, eventos y capacitaciones</li>
                <li>Enviar información sobre nuevos servicios o actualizaciones relevantes</li>
                <li>Proporcionar contenido personalizado basado en sus intereses</li>
              </ul>
              <p>
                <strong>Nota:</strong> Puede retirar su consentimiento en cualquier momento utilizando
                el enlace de "cancelar suscripción" en nuestros correos electrónicos.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3.3 Mejora y Análisis
              </h3>
              <ul>
                <li>Analizar el uso del sitio web para mejorar la experiencia del usuario</li>
                <li>Realizar investigaciones y análisis de mercado</li>
                <li>Desarrollar nuevos servicios y funcionalidades</li>
                <li>Optimizar el rendimiento del sitio web y resolver problemas técnicos</li>
                <li>Medir la efectividad de nuestras campañas de marketing</li>
                <li>Realizar encuestas de satisfacción y recopilar feedback</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3.4 Seguridad y Cumplimiento Legal
              </h3>
              <ul>
                <li>Detectar, prevenir y abordar fraudes y actividades maliciosas</li>
                <li>Proteger la seguridad e integridad de nuestros sistemas</li>
                <li>Cumplir con obligaciones legales y regulatorias</li>
                <li>Responder a solicitudes legales de autoridades competentes</li>
                <li>Hacer cumplir nuestros Términos y Condiciones</li>
                <li>Resolver disputas y reclamaciones</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3.5 Administración Empresarial
              </h3>
              <ul>
                <li>Gestión de relaciones con clientes (CRM)</li>
                <li>Facturación y contabilidad</li>
                <li>Gestión de proyectos y asignación de recursos</li>
                <li>Auditorías internas y control de calidad</li>
                <li>Planificación estratégica y desarrollo de negocio</li>
              </ul>

              {/* Section 4 */}
              <h2 id="base-legal" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                4. Base Legal para el Procesamiento (GDPR)
              </h2>
              <p>
                Para usuarios en la Unión Europea, procesamos sus datos personales basándonos en las
                siguientes bases legales según el GDPR:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                4.1 Consentimiento (Art. 6(1)(a) GDPR)
              </h3>
              <p>
                Procesamos datos con su consentimiento explícito para:
              </p>
              <ul>
                <li>Suscripciones a newsletter y comunicaciones de marketing</li>
                <li>Uso de cookies no esenciales (analíticas, marketing)</li>
                <li>Almacenamiento de preferencias personales</li>
              </ul>
              <p>
                Usted tiene derecho a retirar su consentimiento en cualquier momento sin afectar la
                legalidad del procesamiento basado en el consentimiento antes de su retiro.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                4.2 Ejecución de Contrato (Art. 6(1)(b) GDPR)
              </h3>
              <p>
                El procesamiento es necesario para:
              </p>
              <ul>
                <li>Ejecutar contratos de servicios de consultoría</li>
                <li>Proporcionar servicios solicitados (implementación ERP, asesoría)</li>
                <li>Gestionar proyectos activos</li>
                <li>Procesar pagos y facturación</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                4.3 Obligación Legal (Art. 6(1)(c) GDPR)
              </h3>
              <p>
                El procesamiento es necesario para cumplir con obligaciones legales:
              </p>
              <ul>
                <li>Retención de registros contables y fiscales</li>
                <li>Cumplimiento de leyes laborales y comerciales</li>
                <li>Respuesta a órdenes judiciales y solicitudes legales</li>
                <li>Cumplimiento de regulaciones de protección de datos</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                4.4 Intereses Legítimos (Art. 6(1)(f) GDPR)
              </h3>
              <p>
                Procesamos datos basándonos en nuestros intereses legítimos (cuando no prevalezcan sus
                derechos fundamentales):
              </p>
              <ul>
                <li>Seguridad del sitio web y prevención de fraudes</li>
                <li>Análisis y mejora de nuestros servicios</li>
                <li>Comunicaciones comerciales con clientes existentes</li>
                <li>Gestión y administración interna del negocio</li>
                <li>Marketing directo (con posibilidad de opt-out)</li>
              </ul>

              {/* Section 5 */}
              <h2 id="compartir" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                5. Compartir Información con Terceros
              </h2>
              <p>
                <strong>No vendemos ni alquilamos su información personal a terceros.</strong> Podemos
                compartir su información solo en las siguientes circunstancias:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                5.1 Proveedores de Servicios
              </h3>
              <p>
                Compartimos datos con proveedores de confianza que nos ayudan a operar nuestro negocio:
              </p>
              <ul>
                <li>
                  <strong>Servicios de Email</strong>: Resend (envío de correos electrónicos
                  transaccionales y newsletter)
                </li>
                <li>
                  <strong>Analytics</strong>: Google Analytics 4 (análisis de uso del sitio web,
                  anonimizado cuando sea posible)
                </li>
                <li>
                  <strong>Hosting y CDN</strong>: Proveedores de infraestructura cloud (Vercel,
                  Cloudflare)
                </li>
                <li>
                  <strong>Streaming de Podcast</strong>: Spotify for Podcasters (distribución de
                  contenido de audio)
                </li>
                <li>
                  <strong>CRM y Gestión de Proyectos</strong>: Microsoft Dynamics 365, Microsoft Teams
                </li>
                <li>
                  <strong>Procesadores de Pago</strong>: Procesadores de tarjetas de crédito
                  certificados PCI-DSS
                </li>
                <li>
                  <strong>Servicios de Seguridad</strong>: Herramientas de prevención de fraudes y
                  protección DDoS
                </li>
              </ul>
              <p>
                Todos nuestros proveedores están contractualmente obligados a proteger sus datos y solo
                pueden usarlos para los propósitos específicos que les autorizamos.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                5.2 Socios Comerciales
              </h3>
              <p>
                Con su consentimiento, podemos compartir información con:
              </p>
              <ul>
                <li>
                  <strong>Microsoft</strong>: Como Microsoft Partner, para implementaciones de Dynamics
                  365 y soporte técnico
                </li>
                <li>
                  <strong>Socios de Integración</strong>: Proveedores de software complementarios para
                  proyectos específicos
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                5.3 Requisitos Legales
              </h3>
              <p>
                Podemos divulgar su información cuando sea requerido por ley o para:
              </p>
              <ul>
                <li>Cumplir con órdenes judiciales, citaciones o procesos legales</li>
                <li>Proteger los derechos, propiedad o seguridad de DUO, nuestros clientes o el público</li>
                <li>Detectar, prevenir o abordar fraudes, seguridad o problemas técnicos</li>
                <li>Hacer cumplir nuestros Términos y Condiciones</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                5.4 Transacciones Comerciales
              </h3>
              <p>
                En caso de fusión, adquisición, venta de activos o procedimientos de bancarrota, su
                información personal puede ser transferida como parte de la transacción. Le
                notificaremos mediante aviso en el sitio web y/o por correo electrónico antes de que
                sus datos sean transferidos.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                5.5 Datos Agregados y Anonimizados
              </h3>
              <p>
                Podemos compartir datos agregados, anonimizados o estadísticos que no identifican
                personalmente a individuos con socios, anunciantes, o el público (por ejemplo,
                tendencias de la industria, estudios de caso anónimos).
              </p>

              {/* Section 6 */}
              <h2 id="cookies" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                6. Cookies y Tecnologías de Seguimiento
              </h2>
              <p>
                Utilizamos cookies y tecnologías similares para mejorar su experiencia, analizar el
                uso del sitio y personalizar contenido.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.1 ¿Qué son las Cookies?</h3>
              <p>
                Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando
                visita un sitio web. Nos permiten reconocer su navegador y capturar cierta información.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                6.2 Tipos de Cookies que Utilizamos
              </h3>

              <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
                Cookies Estrictamente Necesarias (No requieren consentimiento)
              </h4>
              <p>
                Estas cookies son esenciales para el funcionamiento del sitio:
              </p>
              <ul>
                <li>Cookies de sesión para mantenerlo conectado</li>
                <li>Cookies de seguridad para prevenir ataques CSRF</li>
                <li>Cookies de balanceo de carga</li>
              </ul>

              <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
                Cookies Funcionales (Requieren consentimiento)
              </h4>
              <p>
                Mejoran la funcionalidad del sitio:
              </p>
              <ul>
                <li>Preferencias de idioma</li>
                <li>Configuraciones de accesibilidad</li>
                <li>Reproducción de contenido multimedia</li>
              </ul>

              <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
                Cookies Analíticas (Requieren consentimiento)
              </h4>
              <p>
                Nos ayudan a entender cómo los visitantes interactúan con el sitio:
              </p>
              <ul>
                <li>
                  <strong>Google Analytics 4</strong>: Análisis de tráfico, páginas vistas, duración
                  de sesión, tasas de rebote
                </li>
                <li>Datos demográficos e intereses (anónimos)</li>
                <li>Rutas de conversión y comportamiento de usuario</li>
              </ul>

              <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
                Cookies de Marketing (Requieren consentimiento)
              </h4>
              <p>
                Utilizadas para rastrear visitantes a través de sitios web:
              </p>
              <ul>
                <li>Remarketing y publicidad personalizada</li>
                <li>Medición de efectividad de campañas</li>
                <li>Integración con redes sociales (LinkedIn, Facebook)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                6.3 Gestión de Cookies
              </h3>
              <p>
                Usted puede controlar y gestionar las cookies de varias maneras:
              </p>
              <ul>
                <li>
                  <strong>Banner de Consentimiento</strong>: Al visitar nuestro sitio por primera vez,
                  puede aceptar o rechazar cookies no esenciales
                </li>
                <li>
                  <strong>Configuración del Navegador</strong>: Puede configurar su navegador para
                  rechazar todas o algunas cookies, o para alertarle cuando se establezcan cookies
                </li>
                <li>
                  <strong>Herramientas de Opt-Out</strong>:
                  <ul>
                    <li>
                      Google Analytics:{' '}
                      <a
                        href="https://tools.google.com/dlpage/gaoptout"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-800"
                      >
                        Browser Opt-out Add-on
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <p>
                <strong>Nota:</strong> Si deshabilita las cookies, algunas funcionalidades del sitio
                pueden no funcionar correctamente.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                6.4 Otras Tecnologías de Seguimiento
              </h3>
              <p>
                Además de cookies, utilizamos:
              </p>
              <ul>
                <li>
                  <strong>Web Beacons (Píxeles)</strong>: Pequeñas imágenes invisibles en correos
                  electrónicos para rastrear tasas de apertura
                </li>
                <li>
                  <strong>Local Storage</strong>: Almacenamiento en el navegador para preferencias y
                  datos de sesión
                </li>
                <li>
                  <strong>Session Storage</strong>: Almacenamiento temporal durante la sesión de
                  navegación
                </li>
              </ul>

              {/* Section 7 */}
              <h2 id="derechos" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                7. Sus Derechos de Privacidad
              </h2>
              <p>
                Dependiendo de su ubicación, usted tiene diversos derechos con respecto a su
                información personal:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                7.1 Derechos bajo GDPR (Usuarios de la UE)
              </h3>
              <ul>
                <li>
                  <strong>Derecho de Acceso (Art. 15)</strong>: Obtener confirmación de si procesamos
                  sus datos y recibir una copia de los mismos
                </li>
                <li>
                  <strong>Derecho de Rectificación (Art. 16)</strong>: Corregir datos inexactos o
                  incompletos
                </li>
                <li>
                  <strong>Derecho de Supresión / "Derecho al Olvido" (Art. 17)</strong>: Solicitar la
                  eliminación de sus datos personales bajo ciertas circunstancias
                </li>
                <li>
                  <strong>Derecho a la Limitación del Procesamiento (Art. 18)</strong>: Restringir el
                  procesamiento de sus datos en ciertos casos
                </li>
                <li>
                  <strong>Derecho a la Portabilidad de Datos (Art. 20)</strong>: Recibir sus datos en
                  un formato estructurado y legible por máquina, y transmitirlos a otro controlador
                </li>
                <li>
                  <strong>Derecho de Oposición (Art. 21)</strong>: Oponerse al procesamiento basado en
                  intereses legítimos o para marketing directo
                </li>
                <li>
                  <strong>Derecho a No Ser Objeto de Decisiones Automatizadas (Art. 22)</strong>: No
                  ser objeto de decisiones basadas únicamente en procesamiento automatizado que
                  produzcan efectos legales significativos
                </li>
                <li>
                  <strong>Derecho a Retirar el Consentimiento (Art. 7)</strong>: Retirar el
                  consentimiento en cualquier momento cuando el procesamiento se base en consentimiento
                </li>
                <li>
                  <strong>Derecho a Presentar una Queja (Art. 77)</strong>: Presentar una queja ante
                  una autoridad de supervisión si cree que el procesamiento viola el GDPR
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                7.2 Derechos bajo Ley 172-13 (República Dominicana)
              </h3>
              <p>
                La Ley 172-13 sobre Protección de Datos Personales de República Dominicana otorga
                derechos similares:
              </p>
              <ul>
                <li>
                  <strong>Derecho de Acceso</strong>: Conocer qué datos se tienen sobre usted
                </li>
                <li>
                  <strong>Derecho de Rectificación</strong>: Actualizar o corregir datos incorrectos
                </li>
                <li>
                  <strong>Derecho de Cancelación</strong>: Solicitar la eliminación de datos
                </li>
                <li>
                  <strong>Derecho de Oposición</strong>: Oponerse al procesamiento de datos para fines
                  específicos
                </li>
                <li>
                  <strong>Derecho a la Información</strong>: Ser informado sobre el uso de sus datos
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                7.3 Cómo Ejercer sus Derechos
              </h3>
              <p>
                Para ejercer cualquiera de estos derechos, puede:
              </p>
              <ol>
                <li>
                  Enviar un correo electrónico a{' '}
                  <a
                    href="mailto:dpo@duosoluciones.com.do"
                    className="text-primary-600 hover:text-primary-800"
                  >
                    dpo@duosoluciones.com.do
                  </a>
                </li>
                <li>
                  Contactarnos por teléfono al{' '}
                  <a href="tel:+18095551234" className="text-primary-600 hover:text-primary-800">
                    +1 (809) 555-1234
                  </a>
                </li>
                <li>Enviarnos una carta a nuestra dirección en Santo Domingo, República Dominicana</li>
              </ol>
              <p>
                Responderemos a su solicitud dentro de <strong>30 días</strong> (GDPR) o{' '}
                <strong>15 días hábiles</strong> (Ley 172-13). Podemos solicitar información adicional
                para verificar su identidad antes de procesar la solicitud.
              </p>

              {/* Section 8 */}
              <h2 id="retencion" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                8. Retención de Datos
              </h2>
              <p>
                Retenemos sus datos personales solo durante el tiempo necesario para cumplir con los
                propósitos para los que fueron recopilados, incluyendo requisitos legales, contables o
                de informes.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                8.1 Períodos de Retención
              </h3>
              <ul>
                <li>
                  <strong>Datos de Contacto (Consultas)</strong>: 2 años desde el último contacto
                </li>
                <li>
                  <strong>Contratos y Proyectos Activos</strong>: Durante la vigencia del contrato +
                  10 años (requisitos fiscales y legales)
                </li>
                <li>
                  <strong>Suscriptores de Newsletter</strong>: Hasta que cancele la suscripción + 30
                  días
                </li>
                <li>
                  <strong>Datos de Facturación y Contabilidad</strong>: 10 años (obligación legal en
                  República Dominicana)
                </li>
                <li>
                  <strong>Registros de Cookies y Analytics</strong>: Máximo 26 meses (Google Analytics)
                </li>
                <li>
                  <strong>Registros de Seguridad (Logs)</strong>: 6-12 meses
                </li>
                <li>
                  <strong>Datos Anónimos Agregados</strong>: Indefinidamente (no identificables)
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                8.2 Criterios para Determinar Períodos de Retención
              </h3>
              <p>
                Los períodos de retención se basan en:
              </p>
              <ul>
                <li>La naturaleza de la relación comercial</li>
                <li>Requisitos legales y regulatorios (fiscales, laborales, comerciales)</li>
                <li>Necesidades operativas y administrativas</li>
                <li>Posibles disputas legales o reclamaciones</li>
                <li>Solicitudes específicas de eliminación (derecho al olvido)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                8.3 Eliminación Segura
              </h3>
              <p>
                Al finalizar el período de retención, eliminamos o anonimizamos sus datos de forma
                segura mediante:
              </p>
              <ul>
                <li>Borrado seguro de bases de datos</li>
                <li>Destrucción física de medios de almacenamiento</li>
                <li>Anonimización irreversible de datos estadísticos</li>
              </ul>

              {/* Section 9 */}
              <h2 id="seguridad" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                9. Seguridad de Datos
              </h2>
              <p>
                Implementamos medidas técnicas y organizativas apropiadas para proteger su información
                personal contra acceso no autorizado, pérdida, destrucción o alteración.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                9.1 Medidas Técnicas de Seguridad
              </h3>
              <ul>
                <li>
                  <strong>Encriptación</strong>: HTTPS/TLS para todas las transmisiones de datos,
                  encriptación en reposo para datos sensibles
                </li>
                <li>
                  <strong>Control de Acceso</strong>: Autenticación multifactor (MFA), control de
                  acceso basado en roles (RBAC)
                </li>
                <li>
                  <strong>Firewalls y Seguridad de Red</strong>: Firewalls de aplicación web (WAF),
                  protección DDoS
                </li>
                <li>
                  <strong>Monitoreo</strong>: Monitoreo continuo de seguridad, detección de
                  intrusiones (IDS)
                </li>
                <li>
                  <strong>Copias de Seguridad</strong>: Backups automáticos encriptados, recuperación
                  ante desastres
                </li>
                <li>
                  <strong>Actualizaciones</strong>: Parches de seguridad regulares, gestión de
                  vulnerabilidades
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                9.2 Medidas Organizativas
              </h3>
              <ul>
                <li>
                  <strong>Capacitación</strong>: Formación regular del personal en protección de datos
                  y seguridad
                </li>
                <li>
                  <strong>Políticas de Seguridad</strong>: Políticas internas estrictas de manejo de
                  datos
                </li>
                <li>
                  <strong>Acuerdos de Confidencialidad</strong>: Todos los empleados y contratistas
                  firman acuerdos de confidencialidad
                </li>
                <li>
                  <strong>Principio de Mínimo Privilegio</strong>: Acceso a datos solo para personal
                  autorizado en base a "necesidad de conocer"
                </li>
                <li>
                  <strong>Auditorías</strong>: Revisiones regulares de seguridad y protección de datos
                </li>
                <li>
                  <strong>Plan de Respuesta a Incidentes</strong>: Procedimientos documentados para
                  brechas de seguridad
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                9.3 Certificaciones y Estándares
              </h3>
              <p>
                Nuestros proveedores de servicios cumplen con estándares de seguridad reconocidos:
              </p>
              <ul>
                <li>ISO 27001 (Gestión de Seguridad de la Información)</li>
                <li>SOC 2 Type II (para proveedores cloud)</li>
                <li>PCI-DSS (para procesamiento de pagos)</li>
                <li>Cumplimiento GDPR de proveedores europeos</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                9.4 Notificación de Brechas de Seguridad
              </h3>
              <p>
                En caso de una brecha de seguridad que afecte sus datos personales, cumpliremos con
                nuestras obligaciones legales:
              </p>
              <ul>
                <li>
                  <strong>GDPR</strong>: Notificación a la autoridad supervisora dentro de 72 horas;
                  notificación a individuos afectados sin demora indebida si hay alto riesgo
                </li>
                <li>
                  <strong>Ley 172-13</strong>: Notificación según requisitos de la autoridad dominicana
                  de protección de datos
                </li>
              </ul>
              <p>
                La notificación incluirá: naturaleza de la brecha, datos afectados, posibles
                consecuencias, y medidas tomadas o propuestas.
              </p>

              {/* Section 10 */}
              <h2 id="transferencias" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                10. Transferencias Internacionales de Datos
              </h2>
              <p>
                Nuestros servidores y algunos de nuestros proveedores de servicios pueden estar
                ubicados fuera de República Dominicana, incluyendo Estados Unidos y la Unión Europea.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                10.1 Salvaguardias para Transferencias
              </h3>
              <p>
                Cuando transferimos datos personales fuera de la UE o República Dominicana, nos
                aseguramos de que existan salvaguardias apropiadas:
              </p>
              <ul>
                <li>
                  <strong>Cláusulas Contractuales Estándar (SCC)</strong>: Contratos aprobados por la
                  Comisión Europea para transferencias a países sin decisión de adecuación
                </li>
                <li>
                  <strong>Decisiones de Adecuación</strong>: Transferencias a países con nivel de
                  protección adecuado reconocido por la UE
                </li>
                <li>
                  <strong>Certificaciones</strong>: Proveedores certificados bajo marcos como Privacy
                  Shield (histórico) o mecanismos sucesores
                </li>
                <li>
                  <strong>Acuerdos de Procesamiento de Datos (DPA)</strong>: Contratos con todos los
                  proveedores que procesan datos en nuestro nombre
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                10.2 Proveedores con Ubicaciones Globales
              </h3>
              <ul>
                <li>
                  <strong>Google (Analytics)</strong>: USA, con SCC y cumplimiento GDPR
                </li>
                <li>
                  <strong>Microsoft (Dynamics 365, Azure)</strong>: Centros de datos globales,
                  cumplimiento GDPR
                </li>
                <li>
                  <strong>Resend (Email)</strong>: USA, con SCC
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                10.3 Su Consentimiento
              </h3>
              <p>
                Al utilizar nuestros servicios, usted consiente las transferencias internacionales de
                datos descritas en esta política, sujeto a las salvaguardias mencionadas.
              </p>

              {/* Section 11 */}
              <h2 id="menores" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                11. Privacidad de Menores
              </h2>
              <p>
                Nuestro sitio web y servicios están dirigidos a profesionales y empresas, no a menores
                de edad.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">11.1 Edad Mínima</h3>
              <p>
                No recopilamos intencionalmente información personal de personas menores de{' '}
                <strong>18 años</strong> (o la edad mínima legal en su jurisdicción para consentir el
                procesamiento de datos personales).
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                11.2 Eliminación de Datos de Menores
              </h3>
              <p>
                Si descubrimos que hemos recopilado información personal de un menor sin el
                consentimiento verificable de los padres, eliminaremos esa información de nuestros
                servidores inmediatamente.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">11.3 Notificación de Padres</h3>
              <p>
                Si usted es padre/madre o tutor y cree que su hijo nos ha proporcionado información
                personal, contáctenos inmediatamente en{' '}
                <a
                  href="mailto:dpo@duosoluciones.com.do"
                  className="text-primary-600 hover:text-primary-800"
                >
                  dpo@duosoluciones.com.do
                </a>{' '}
                para que podamos tomar las medidas necesarias.
              </p>

              {/* Section 12 */}
              <h2 id="ccpa" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                12. Derechos Específicos CCPA (California)
              </h2>
              <p>
                Si usted es residente de California, la Ley de Privacidad del Consumidor de California
                (CCPA) le otorga derechos adicionales:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                12.1 Categorías de Información Personal Recopilada
              </h3>
              <p>
                En los últimos 12 meses, hemos recopilado las siguientes categorías de información
                personal:
              </p>
              <ul>
                <li>
                  <strong>Identificadores</strong>: Nombre, dirección de correo electrónico, dirección
                  IP, identificadores de cookies
                </li>
                <li>
                  <strong>Información Comercial</strong>: Historial de transacciones, interacciones con
                  servicios
                </li>
                <li>
                  <strong>Actividad en Internet</strong>: Historial de navegación, interacciones con
                  sitio web
                </li>
                <li>
                  <strong>Información Profesional</strong>: Información de empleo, empresa, cargo
                </li>
                <li>
                  <strong>Inferencias</strong>: Perfiles de preferencias e intereses profesionales
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                12.2 Propósitos Comerciales
              </h3>
              <p>
                Recopilamos y usamos estas categorías de información para los propósitos comerciales
                descritos en la Sección 3 (Cómo Utilizamos sus Datos).
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">12.3 Venta de Información</h3>
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded my-6">
                <p className="mb-0 font-semibold text-green-900">
                  <strong>NO vendemos su información personal.</strong>
                </p>
                <p className="mb-0 text-green-800 mt-2">
                  No hemos vendido información personal de consumidores en los últimos 12 meses y no
                  tenemos planes de hacerlo en el futuro.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                12.4 Derechos bajo CCPA
              </h3>
              <p>
                Como residente de California, usted tiene derecho a:
              </p>
              <ul>
                <li>
                  <strong>Derecho a Saber</strong>: Solicitar que revelemos qué información personal
                  recopilamos, usamos, divulgamos y vendemos sobre usted
                </li>
                <li>
                  <strong>Derecho a Eliminar</strong>: Solicitar la eliminación de su información
                  personal (sujeto a excepciones)
                </li>
                <li>
                  <strong>Derecho a Opt-Out de la Venta</strong>: Aunque no vendemos datos, puede
                  ejercer este derecho en cualquier momento
                </li>
                <li>
                  <strong>Derecho a No Discriminación</strong>: No serás discriminado por ejercer sus
                  derechos CCPA
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                12.5 Cómo Ejercer sus Derechos CCPA
              </h3>
              <p>
                Para ejercer sus derechos CCPA:
              </p>
              <ul>
                <li>
                  Email:{' '}
                  <a
                    href="mailto:ccpa@duosoluciones.com.do"
                    className="text-primary-600 hover:text-primary-800"
                  >
                    ccpa@duosoluciones.com.do
                  </a>
                </li>
                <li>
                  Teléfono:{' '}
                  <a href="tel:+18095551234" className="text-primary-600 hover:text-primary-800">
                    +1 (809) 555-1234
                  </a>
                </li>
              </ul>
              <p>
                Verificaremos su identidad antes de procesar su solicitud. Responderemos dentro de{' '}
                <strong>45 días</strong>.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                12.6 Agente Autorizado
              </h3>
              <p>
                Puede designar un agente autorizado para hacer una solicitud en su nombre. El agente
                deberá proporcionar prueba escrita de autorización.
              </p>

              {/* Section 13 */}
              <h2 id="cambios" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                13. Cambios a esta Política de Privacidad
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                13.1 Actualizaciones
              </h3>
              <p>
                Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier
                momento para reflejar cambios en nuestras prácticas, tecnología, requisitos legales u
                otros factores.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                13.2 Notificación de Cambios Materiales
              </h3>
              <p>
                Para cambios materiales que afecten significativamente sus derechos:
              </p>
              <ul>
                <li>Actualizaremos la fecha de "Última actualización" en la parte superior</li>
                <li>Publicaremos un aviso destacado en nuestro sitio web durante 30 días</li>
                <li>Enviaremos una notificación por correo electrónico a suscriptores</li>
                <li>
                  En algunos casos, solicitaremos su consentimiento renovado (especialmente bajo GDPR)
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                13.3 Su Responsabilidad
              </h3>
              <p>
                Le recomendamos revisar esta Política periódicamente. El uso continuado de nuestros
                servicios después de cambios constituye su aceptación de la Política revisada.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                13.4 Versiones Anteriores
              </h3>
              <p>
                Puede solicitar versiones anteriores de esta Política contactándonos en{' '}
                <a
                  href="mailto:dpo@duosoluciones.com.do"
                  className="text-primary-600 hover:text-primary-800"
                >
                  dpo@duosoluciones.com.do
                </a>
                .
              </p>

              {/* Section 14 */}
              <h2 id="contacto" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                14. Contacto y Ejercicio de Derechos
              </h2>
              <p>
                Si tiene preguntas, inquietudes o desea ejercer sus derechos de privacidad, puede
                contactarnos:
              </p>

              <div className="bg-gray-50 rounded-lg p-6 my-6">
                <h3 className="text-xl font-semibold text-gray-900 mt-0 mb-4">
                  Oficial de Protección de Datos (DPO)
                </h3>
                <p className="mb-2">
                  <strong>Empresa:</strong> DUO Soluciones Empresariales
                </p>
                <p className="mb-2">
                  <strong>Dirección:</strong> Santo Domingo, República Dominicana
                </p>
                <p className="mb-2">
                  <strong>Email General:</strong>{' '}
                  <a
                    href="mailto:info@duosoluciones.com.do"
                    className="text-primary-600 hover:text-primary-800"
                  >
                    info@duosoluciones.com.do
                  </a>
                </p>
                <p className="mb-2">
                  <strong>Email DPO:</strong>{' '}
                  <a
                    href="mailto:dpo@duosoluciones.com.do"
                    className="text-primary-600 hover:text-primary-800"
                  >
                    dpo@duosoluciones.com.do
                  </a>
                </p>
                <p className="mb-2">
                  <strong>Solicitudes CCPA:</strong>{' '}
                  <a
                    href="mailto:ccpa@duosoluciones.com.do"
                    className="text-primary-600 hover:text-primary-800"
                  >
                    ccpa@duosoluciones.com.do
                  </a>
                </p>
                <p className="mb-2">
                  <strong>Teléfono:</strong>{' '}
                  <a href="tel:+18095551234" className="text-primary-600 hover:text-primary-800">
                    +1 (809) 555-1234
                  </a>
                </p>
                <p className="mb-0">
                  <strong>Horario:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM (AST)
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                14.1 Autoridades de Supervisión
              </h3>
              <p>
                Si no está satisfecho con nuestra respuesta o cree que estamos procesando sus datos de
                manera ilegal, tiene derecho a presentar una queja ante las autoridades relevantes:
              </p>

              <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
                Para Residentes de la UE (GDPR)
              </h4>
              <p>
                Puede presentar una queja ante la autoridad de supervisión de su país de residencia
                habitual, lugar de trabajo o donde ocurrió la presunta infracción. Lista de
                autoridades:{' '}
                <a
                  href="https://edpb.europa.eu/about-edpb/about-edpb/members_en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-800"
                >
                  edpb.europa.eu
                </a>
              </p>

              <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
                Para Residentes de República Dominicana (Ley 172-13)
              </h4>
              <p>
                <strong>Autoridad de Protección de Datos Personal</strong>
                <br />
                Órgano regulador designado bajo la Ley 172-13
                <br />
                [Información de contacto a ser completada]
              </p>

              <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
                Para Residentes de California (CCPA)
              </h4>
              <p>
                <strong>California Attorney General's Office</strong>
                <br />
                Website:{' '}
                <a
                  href="https://oag.ca.gov/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-800"
                >
                  oag.ca.gov/privacy
                </a>
              </p>

              {/* Footer Links */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Documentos Relacionados</h3>
                <ul className="space-y-2 list-none pl-0">
                  <li>
                    <Link href="/terminos" className="text-primary-600 hover:text-primary-800 text-lg">
                      → Términos y Condiciones
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/aviso-legal"
                      className="text-primary-600 hover:text-primary-800 text-lg"
                    >
                      → Aviso Legal
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-primary-600 hover:text-primary-800 text-lg">
                      → Contacto
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Final Notice */}
              <div className="mt-8 p-6 bg-primary-50 border-l-4 border-primary-600 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Compromiso de Privacidad:</strong>
                </p>
                <p className="text-sm text-gray-700 mb-0">
                  En DUO Soluciones Empresariales, la protección de su privacidad es una prioridad
                  fundamental. Nos comprometemos a procesar sus datos de manera transparente, segura y
                  conforme a todas las leyes aplicables. Si tiene alguna pregunta o inquietud, no dude
                  en contactarnos.
                </p>
              </div>

              {/* Compliance Badges */}
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-semibold">
                  GDPR Compliant
                </div>
                <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-semibold">
                  CCPA Compliant
                </div>
                <div className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg text-sm font-semibold">
                  Ley 172-13 (RD)
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
