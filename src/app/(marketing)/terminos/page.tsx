import { Container } from '@/components/ui/Container'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | DUO Soluciones Empresariales',
  description:
    'Términos y condiciones de uso del sitio web de DUO Soluciones Empresariales. Consultoría empresarial en República Dominicana.',
  robots: 'index, follow',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-900 py-16 text-white">
        <Container>
          <h1 className="text-4xl font-bold md:text-5xl">Términos y Condiciones</h1>
          <p className="mt-4 text-xl text-white/90">Última actualización: 23 de octubre de 2025</p>
        </Container>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-4xl">
            {/* Introduction */}
            <div className="prose prose-lg max-w-none">
              <div className="rounded-lg bg-primary-50 p-6 border border-primary-200 mb-8">
                <p className="text-gray-800 leading-relaxed mb-0">
                  Bienvenido a DUO Soluciones Empresariales. Al acceder y utilizar nuestro sitio web{' '}
                  <strong>https://duo-soluciones.com</strong> (en adelante, el "Sitio"), usted acepta
                  cumplir y estar sujeto a los siguientes términos y condiciones de uso. Le
                  recomendamos leer estos términos detenidamente antes de utilizar nuestros servicios.
                </p>
              </div>

              {/* Table of Contents */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-4">Índice de Contenidos</h2>
                <ol className="space-y-2 mb-0">
                  <li>
                    <a href="#aceptacion" className="text-primary-600 hover:text-primary-800">
                      Aceptación de los Términos
                    </a>
                  </li>
                  <li>
                    <a href="#definiciones" className="text-primary-600 hover:text-primary-800">
                      Definiciones
                    </a>
                  </li>
                  <li>
                    <a href="#servicios" className="text-primary-600 hover:text-primary-800">
                      Descripción de Servicios
                    </a>
                  </li>
                  <li>
                    <a href="#uso" className="text-primary-600 hover:text-primary-800">
                      Uso del Sitio Web
                    </a>
                  </li>
                  <li>
                    <a href="#obligaciones" className="text-primary-600 hover:text-primary-800">
                      Obligaciones del Usuario
                    </a>
                  </li>
                  <li>
                    <a href="#propiedad" className="text-primary-600 hover:text-primary-800">
                      Propiedad Intelectual
                    </a>
                  </li>
                  <li>
                    <a href="#limitacion" className="text-primary-600 hover:text-primary-800">
                      Limitación de Responsabilidad
                    </a>
                  </li>
                  <li>
                    <a href="#garantias" className="text-primary-600 hover:text-primary-800">
                      Descargo de Garantías
                    </a>
                  </li>
                  <li>
                    <a href="#indemnizacion" className="text-primary-600 hover:text-primary-800">
                      Indemnización
                    </a>
                  </li>
                  <li>
                    <a href="#privacidad" className="text-primary-600 hover:text-primary-800">
                      Privacidad y Protección de Datos
                    </a>
                  </li>
                  <li>
                    <a href="#enlaces" className="text-primary-600 hover:text-primary-800">
                      Enlaces a Terceros
                    </a>
                  </li>
                  <li>
                    <a href="#terminacion" className="text-primary-600 hover:text-primary-800">
                      Terminación
                    </a>
                  </li>
                  <li>
                    <a href="#modificaciones" className="text-primary-600 hover:text-primary-800">
                      Modificaciones
                    </a>
                  </li>
                  <li>
                    <a href="#ley" className="text-primary-600 hover:text-primary-800">
                      Ley Aplicable y Jurisdicción
                    </a>
                  </li>
                  <li>
                    <a href="#resolucion" className="text-primary-600 hover:text-primary-800">
                      Resolución de Disputas
                    </a>
                  </li>
                  <li>
                    <a href="#disposiciones" className="text-primary-600 hover:text-primary-800">
                      Disposiciones Generales
                    </a>
                  </li>
                  <li>
                    <a href="#contacto" className="text-primary-600 hover:text-primary-800">
                      Contacto
                    </a>
                  </li>
                </ol>
              </div>

              {/* Section 1 */}
              <h2 id="aceptacion" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                1. Aceptación de los Términos
              </h2>
              <p>
                Al acceder, navegar o utilizar este Sitio web, usted reconoce que ha leído,
                entendido y acepta estar sujeto a estos Términos y Condiciones, así como a nuestra{' '}
                <Link href="/privacidad" className="text-primary-600 hover:text-primary-800">
                  Política de Privacidad
                </Link>{' '}
                y{' '}
                <Link href="/aviso-legal" className="text-primary-600 hover:text-primary-800">
                  Aviso Legal
                </Link>
                .
              </p>
              <p>
                <strong>Si no está de acuerdo con estos términos, le solicitamos que no utilice
                nuestro Sitio.</strong> El uso continuado del Sitio después de cualquier modificación
                de estos términos constituirá su aceptación de dichas modificaciones.
              </p>

              {/* Section 2 */}
              <h2 id="definiciones" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                2. Definiciones
              </h2>
              <p>Para los efectos de estos Términos y Condiciones, se entenderá por:</p>
              <ul>
                <li>
                  <strong>"DUO"</strong>, <strong>"nosotros"</strong>, <strong>"nuestro"</strong>:
                  DUO Soluciones Empresariales, empresa de consultoría empresarial establecida en
                  Santo Domingo, República Dominicana.
                </li>
                <li>
                  <strong>"Sitio"</strong> o <strong>"Sitio Web"</strong>: El sitio web disponible en
                  https://duo-soluciones.com y todos sus subdominios.
                </li>
                <li>
                  <strong>"Usuario"</strong>, <strong>"usted"</strong>, <strong>"su"</strong>:
                  Cualquier persona física o jurídica que acceda, navegue o utilice el Sitio.
                </li>
                <li>
                  <strong>"Servicios"</strong>: Los servicios de consultoría empresarial ofrecidos
                  por DUO, incluyendo pero no limitado a: Desarrollo Organizacional, Mejora de
                  Procesos, Implementación de ERP (Microsoft Dynamics 365), Gobernanza Corporativa, y
                  contenidos digitales como blog, podcast y newsletter.
                </li>
                <li>
                  <strong>"Contenido"</strong>: Toda la información, textos, gráficos, imágenes,
                  videos, audio, software, código fuente y otros materiales disponibles en el Sitio.
                </li>
              </ul>

              {/* Section 3 */}
              <h2 id="servicios" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                3. Descripción de Servicios
              </h2>
              <p>
                DUO Soluciones Empresariales es una firma de consultoría especializada en
                transformación organizacional y mejora empresarial. A través de nuestro Sitio web,
                ofrecemos:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3.1 Servicios de Consultoría
              </h3>
              <ul>
                <li>
                  <strong>Desarrollo Organizacional</strong>: Diseño de estructuras organizacionales,
                  cultura empresarial y gestión del cambio.
                </li>
                <li>
                  <strong>Mejora de Procesos</strong>: Optimización operacional mediante metodologías
                  Lean Six Sigma y gestión de procesos de negocio (BPM).
                </li>
                <li>
                  <strong>Implementación de ERP</strong>: Implementación y personalización de
                  Microsoft Dynamics 365, Power BI y Power Platform.
                </li>
                <li>
                  <strong>Gobernanza Corporativa</strong>: Asesoría en estructuras de gobierno,
                  cumplimiento normativo y gestión de riesgos.
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3.2 Servicios Digitales
              </h3>
              <ul>
                <li>
                  <strong>Blog Corporativo</strong>: Artículos y recursos sobre mejores prácticas
                  empresariales.
                </li>
                <li>
                  <strong>Podcast</strong>: Contenido en audio sobre transformación empresarial.
                </li>
                <li>
                  <strong>Newsletter</strong>: Boletín informativo con insights y tendencias del
                  sector.
                </li>
                <li>
                  <strong>Formularios de Contacto</strong>: Canales de comunicación para consultas y
                  solicitudes de información.
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3.3 Naturaleza Informativa
              </h3>
              <p>
                El contenido proporcionado en el Sitio es de naturaleza <strong>informativa y
                educativa</strong>. La información no constituye asesoramiento profesional específico
                y no debe ser utilizada como sustituto de consultoría profesional personalizada.
                Recomendamos contactarnos directamente para obtener asesoramiento adaptado a sus
                necesidades específicas.
              </p>

              {/* Section 4 */}
              <h2 id="uso" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                4. Uso del Sitio Web
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.1 Licencia de Uso</h3>
              <p>
                DUO le otorga una licencia limitada, no exclusiva, no transferible y revocable para
                acceder y utilizar el Sitio para fines personales o comerciales legítimos, de
                conformidad con estos Términos y Condiciones.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.2 Uso Permitido</h3>
              <p>Usted puede utilizar el Sitio para:</p>
              <ul>
                <li>Consultar información sobre nuestros servicios de consultoría</li>
                <li>Leer y compartir contenido de nuestro blog y recursos educativos</li>
                <li>Suscribirse a nuestro newsletter</li>
                <li>
                  Contactarnos a través de los formularios disponibles para solicitar información o
                  servicios
                </li>
                <li>Escuchar nuestro podcast y contenido multimedia</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.3 Uso Prohibido</h3>
              <p>Queda estrictamente prohibido:</p>
              <ul>
                <li>
                  Utilizar el Sitio para fines ilegales, fraudulentos o no autorizados
                </li>
                <li>
                  Realizar ingeniería inversa, descompilar o desensamblar cualquier parte del Sitio
                </li>
                <li>
                  Intentar obtener acceso no autorizado a sistemas, cuentas o redes conectadas al
                  Sitio
                </li>
                <li>
                  Transmitir virus, malware o cualquier código malicioso
                </li>
                <li>
                  Recopilar información de otros usuarios sin su consentimiento expreso
                </li>
                <li>
                  Copiar, modificar, distribuir o crear obras derivadas del contenido sin autorización
                  previa por escrito
                </li>
                <li>
                  Utilizar robots, spiders, scrapers u otros medios automatizados para acceder al
                  Sitio sin nuestro consentimiento previo
                </li>
                <li>
                  Publicar o transmitir contenido difamatorio, obsceno, ofensivo o que infrinja
                  derechos de terceros
                </li>
                <li>
                  Interferir con el correcto funcionamiento del Sitio o los servidores que lo alojan
                </li>
                <li>
                  Hacerse pasar por otra persona o entidad, o falsear su afiliación con una persona o
                  entidad
                </li>
              </ul>

              {/* Section 5 */}
              <h2 id="obligaciones" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                5. Obligaciones del Usuario
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                5.1 Responsabilidad del Usuario
              </h3>
              <p>Como usuario del Sitio, usted se compromete a:</p>
              <ul>
                <li>
                  Proporcionar información veraz, precisa, actual y completa cuando utilice los
                  formularios de contacto o se suscriba a nuestros servicios
                </li>
                <li>
                  Mantener la seguridad de cualquier credencial de acceso (si aplica) y notificarnos
                  inmediatamente de cualquier uso no autorizado
                </li>
                <li>
                  Utilizar el Sitio de manera responsable y respetuosa
                </li>
                <li>
                  Cumplir con todas las leyes aplicables locales, nacionales e internacionales
                </li>
                <li>
                  Respetar los derechos de propiedad intelectual de DUO y de terceros
                </li>
                <li>
                  No utilizar el Sitio de manera que pueda dañar, deshabilitar, sobrecargar o
                  deteriorar nuestros servidores o redes
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                5.2 Consecuencias del Incumplimiento
              </h3>
              <p>
                El incumplimiento de estas obligaciones puede resultar en la terminación inmediata de
                su acceso al Sitio, sin previo aviso, y puede dar lugar a acciones legales civiles o
                penales según corresponda bajo las leyes de la República Dominicana.
              </p>

              {/* Section 6 */}
              <h2 id="propiedad" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                6. Propiedad Intelectual
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                6.1 Derechos de Propiedad
              </h3>
              <p>
                Todo el Contenido presente en este Sitio, incluyendo pero no limitado a textos,
                gráficos, logotipos, iconos, imágenes, clips de audio, descargas digitales, software,
                compilaciones de datos y diseño del sitio web, es propiedad exclusiva de DUO
                Soluciones Empresariales o de sus proveedores de contenido y está protegido por las
                leyes de propiedad intelectual de la República Dominicana e internacionales,
                incluyendo:
              </p>
              <ul>
                <li>
                  Derechos de autor (Copyright) según la Ley 65-00 sobre Derecho de Autor de
                  República Dominicana
                </li>
                <li>Derechos de marcas comerciales</li>
                <li>Derechos de diseño industrial</li>
                <li>Secretos comerciales y know-how</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.2 Marcas Registradas</h3>
              <p>
                <strong>DUO Soluciones Empresariales</strong>, el logotipo de DUO, y otras marcas,
                nombres comerciales y logotipos utilizados en el Sitio son marcas registradas o no
                registradas de DUO. Las marcas de terceros mencionadas en el Sitio (como Microsoft,
                Dynamics 365, Power BI, etc.) son propiedad de sus respectivos titulares.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.3 Uso Limitado</h3>
              <p>
                El acceso al Sitio no le otorga ningún derecho o licencia sobre la propiedad
                intelectual de DUO. Usted puede visualizar, descargar e imprimir páginas del Sitio
                exclusivamente para uso personal, educativo o interno de su organización, siempre que:
              </p>
              <ul>
                <li>Mantenga intactos todos los avisos de derechos de autor y propiedad</li>
                <li>No modifique el contenido</li>
                <li>No utilice el contenido con fines comerciales sin autorización previa por escrito</li>
                <li>No redistribuya ni publique el contenido en otros sitios web o medios</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                6.4 Solicitud de Autorización
              </h3>
              <p>
                Para solicitar permiso para utilizar cualquier contenido del Sitio más allá de lo
                establecido en estos Términos, por favor contáctenos en{' '}
                <a href="mailto:info@duosoluciones.com.do" className="text-primary-600 hover:text-primary-800">
                  info@duosoluciones.com.do
                </a>
                .
              </p>

              {/* Section 7 */}
              <h2 id="limitacion" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                7. Limitación de Responsabilidad
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                7.1 Exclusión de Responsabilidad
              </h3>
              <p>
                En la máxima medida permitida por la ley aplicable, DUO Soluciones Empresariales, sus
                directores, empleados, socios, proveedores y afiliados NO serán responsables por
                ningún daño directo, indirecto, incidental, especial, consecuente o punitivo que
                resulte de:
              </p>
              <ul>
                <li>El uso o la imposibilidad de uso del Sitio</li>
                <li>Errores, omisiones o inexactitudes en el contenido del Sitio</li>
                <li>Acceso no autorizado a nuestros servidores o información personal</li>
                <li>Interrupciones o cesación de la transmisión hacia o desde el Sitio</li>
                <li>Virus, malware o código malicioso transmitido a través del Sitio</li>
                <li>Pérdida de datos, beneficios, ingresos o ganancias</li>
                <li>Cualquier contenido, conducta o servicios de terceros enlazados desde el Sitio</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                7.2 Límite de Responsabilidad
              </h3>
              <p>
                En ningún caso la responsabilidad total de DUO hacia usted por todos los daños,
                pérdidas y causas de acción (ya sea por contrato, agravio o de otro modo) excederá la
                cantidad que usted haya pagado a DUO, si corresponde, por acceder al Sitio en los
                últimos seis (6) meses.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                7.3 Servicios de Consultoría
              </h3>
              <p>
                Esta limitación de responsabilidad se refiere exclusivamente al uso del Sitio web. Los
                servicios de consultoría prestados por DUO están sujetos a acuerdos contractuales
                separados con términos de responsabilidad específicos.
              </p>

              {/* Section 8 */}
              <h2 id="garantias" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                8. Descargo de Garantías
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8.1 "Tal Cual"</h3>
              <p>
                El Sitio y todo el contenido se proporcionan <strong>"TAL CUAL"</strong> y{' '}
                <strong>"SEGÚN DISPONIBILIDAD"</strong>, sin garantías de ningún tipo, ya sean
                expresas o implícitas, incluyendo pero no limitado a:
              </p>
              <ul>
                <li>Garantías de comerciabilidad</li>
                <li>Idoneidad para un propósito particular</li>
                <li>No infracción de derechos de terceros</li>
                <li>Precisión, integridad o actualidad del contenido</li>
                <li>Disponibilidad ininterrumpida o libre de errores del Sitio</li>
                <li>Corrección de defectos</li>
                <li>Ausencia de virus o componentes dañinos</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                8.2 Responsabilidad del Usuario
              </h3>
              <p>
                Usted reconoce y acepta que el uso del Sitio es bajo su propio riesgo. Es su
                responsabilidad tomar las precauciones necesarias para proteger sus sistemas y datos,
                incluyendo el uso de software antivirus y sistemas de seguridad apropiados.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                8.3 Contenido de Terceros
              </h3>
              <p>
                No garantizamos la precisión, confiabilidad o integridad de contenido, publicidad u
                otros materiales de terceros enlazados o accesibles a través del Sitio.
              </p>

              {/* Section 9 */}
              <h2 id="indemnizacion" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                9. Indemnización
              </h2>
              <p>
                Usted acepta indemnizar, defender y mantener indemne a DUO Soluciones Empresariales,
                sus filiales, directores, empleados, agentes, socios y licenciatarios de y contra
                todas y cada una de las reclamaciones, responsabilidades, daños, pérdidas, costos,
                gastos y honorarios (incluyendo honorarios razonables de abogados) que surjan de o
                estén relacionados con:
              </p>
              <ul>
                <li>Su acceso o uso del Sitio</li>
                <li>Su violación de estos Términos y Condiciones</li>
                <li>Su violación de cualquier ley o regulación aplicable</li>
                <li>
                  Su violación de los derechos de cualquier tercero, incluyendo derechos de propiedad
                  intelectual, privacidad o publicidad
                </li>
                <li>Cualquier contenido que usted envíe o transmita a través del Sitio</li>
                <li>
                  Cualquier actividad fraudulenta, negligente o dolosa en relación con el uso del
                  Sitio
                </li>
              </ul>
              <p>
                Esta obligación de indemnización sobrevivirá a la terminación de estos Términos y
                Condiciones y su uso del Sitio.
              </p>

              {/* Section 10 */}
              <h2 id="privacidad" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                10. Privacidad y Protección de Datos
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                10.1 Política de Privacidad
              </h3>
              <p>
                La recopilación y el uso de información personal a través del Sitio se rigen por
                nuestra{' '}
                <Link href="/privacidad" className="text-primary-600 hover:text-primary-800">
                  Política de Privacidad
                </Link>
                , que forma parte integral de estos Términos y Condiciones. Le recomendamos leer
                nuestra Política de Privacidad para comprender cómo recopilamos, usamos y protegemos
                su información.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">10.2 Cumplimiento Legal</h3>
              <p>
                DUO cumple con las leyes de protección de datos aplicables, incluyendo:
              </p>
              <ul>
                <li>
                  <strong>Ley 172-13</strong> sobre Protección de Datos Personales de República
                  Dominicana
                </li>
                <li>
                  <strong>GDPR</strong> (Reglamento General de Protección de Datos de la UE) para
                  usuarios europeos
                </li>
                <li>
                  <strong>CCPA</strong> (Ley de Privacidad del Consumidor de California) para
                  usuarios de California
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">10.3 Cookies</h3>
              <p>
                Utilizamos cookies y tecnologías similares para mejorar su experiencia en el Sitio.
                Para más información sobre nuestro uso de cookies, consulte nuestra Política de
                Privacidad.
              </p>

              {/* Section 11 */}
              <h2 id="enlaces" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                11. Enlaces a Terceros
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                11.1 Enlaces Externos
              </h3>
              <p>
                El Sitio puede contener enlaces a sitios web, servicios o recursos de terceros que no
                son propiedad ni están controlados por DUO Soluciones Empresariales, incluyendo pero
                no limitado a:
              </p>
              <ul>
                <li>Plataformas de redes sociales (LinkedIn, Twitter, Facebook)</li>
                <li>Servicios de hosting de contenido (Spotify para podcast)</li>
                <li>Herramientas de análisis (Google Analytics)</li>
                <li>Recursos educativos y asociaciones profesionales</li>
                <li>Sitios web de clientes o socios</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                11.2 Ausencia de Respaldo
              </h3>
              <p>
                La presencia de enlaces a sitios de terceros no constituye un respaldo, recomendación
                o aprobación por parte de DUO del contenido, productos, servicios o prácticas de
                dichos sitios. DUO no tiene control sobre y no asume ninguna responsabilidad por el
                contenido, políticas de privacidad o prácticas de sitios web de terceros.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                11.3 Uso Bajo su Riesgo
              </h3>
              <p>
                Usted reconoce y acepta que accede a sitios web de terceros bajo su propio riesgo.
                Recomendamos que revise los términos y condiciones y políticas de privacidad de
                cualquier sitio web de terceros que visite.
              </p>

              {/* Section 12 */}
              <h2 id="terminacion" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                12. Terminación
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                12.1 Terminación por DUO
              </h3>
              <p>
                DUO se reserva el derecho de suspender o terminar su acceso al Sitio, en cualquier
                momento, con o sin causa, con o sin previo aviso, y sin responsabilidad alguna. Los
                motivos para la terminación pueden incluir, pero no se limitan a:
              </p>
              <ul>
                <li>Violación de estos Términos y Condiciones</li>
                <li>Solicitud de autoridades legales o gubernamentales</li>
                <li>Discontinuación o modificación sustancial del Sitio</li>
                <li>Problemas técnicos o de seguridad</li>
                <li>Actividad fraudulenta, abusiva o ilegal</li>
                <li>Falta de pago por servicios (si aplica)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                12.2 Terminación por el Usuario
              </h3>
              <p>
                Usted puede cesar el uso del Sitio en cualquier momento. Para darse de baja de
                nuestro newsletter o servicios de comunicación, siga las instrucciones de
                cancelación de suscripción incluidas en cada correo electrónico o contáctenos
                directamente.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                12.3 Efectos de la Terminación
              </h3>
              <p>
                Tras la terminación de su acceso al Sitio:
              </p>
              <ul>
                <li>Cesarán todos los derechos otorgados bajo estos Términos y Condiciones</li>
                <li>
                  Deberá cesar inmediatamente todo uso del Sitio y cualquier contenido obtenido del
                  mismo
                </li>
                <li>
                  Las disposiciones que por su naturaleza deban sobrevivir a la terminación
                  permanecerán vigentes, incluyendo las secciones sobre Propiedad Intelectual,
                  Limitación de Responsabilidad, Indemnización y Ley Aplicable
                </li>
              </ul>

              {/* Section 13 */}
              <h2 id="modificaciones" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                13. Modificaciones
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                13.1 Modificaciones a los Términos
              </h3>
              <p>
                DUO se reserva el derecho de modificar, actualizar o reemplazar estos Términos y
                Condiciones en cualquier momento a su exclusiva discreción. Las modificaciones pueden
                realizarse por diversos motivos, incluyendo:
              </p>
              <ul>
                <li>Cambios en la legislación aplicable</li>
                <li>Introducción de nuevos servicios o funcionalidades</li>
                <li>Mejoras en las prácticas de seguridad o privacidad</li>
                <li>Aclaraciones o correcciones</li>
                <li>Cambios en nuestras prácticas comerciales</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">13.2 Notificación</h3>
              <p>
                Cuando realicemos cambios, actualizaremos la fecha de "Última actualización" en la
                parte superior de esta página. Para cambios materiales, podemos proporcionar aviso
                adicional mediante:
              </p>
              <ul>
                <li>Publicación de un aviso destacado en el Sitio</li>
                <li>Envío de notificación por correo electrónico (si usted está suscrito)</li>
                <li>Publicación en nuestras redes sociales</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                13.3 Aceptación de Cambios
              </h3>
              <p>
                Es su responsabilidad revisar periódicamente estos Términos y Condiciones. El uso
                continuado del Sitio después de la publicación de modificaciones constituye su
                aceptación de dichas modificaciones. Si no está de acuerdo con los términos
                modificados, debe discontinuar el uso del Sitio.
              </p>

              {/* Section 14 */}
              <h2 id="ley" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                14. Ley Aplicable y Jurisdicción
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">14.1 Ley Aplicable</h3>
              <p>
                Estos Términos y Condiciones se regirán e interpretarán de conformidad con las leyes
                de la <strong>República Dominicana</strong>, sin dar efecto a ningún principio de
                conflictos de leyes. Se aplicarán, entre otras, las siguientes normativas:
              </p>
              <ul>
                <li>Código Civil Dominicano</li>
                <li>Código de Comercio</li>
                <li>Ley 65-00 sobre Derecho de Autor</li>
                <li>Ley 172-13 sobre Protección de Datos Personales</li>
                <li>Ley 126-02 sobre Comercio Electrónico, Documentos y Firmas Digitales</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">14.2 Jurisdicción</h3>
              <p>
                Para cualquier controversia, disputa o reclamación que surja de o se relacione con
                estos Términos y Condiciones, o el uso del Sitio, usted acepta someterse a la
                jurisdicción exclusiva de los tribunales competentes de{' '}
                <strong>Santo Domingo, República Dominicana</strong>.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                14.3 Renuncia a Juicio por Jurado
              </h3>
              <p>
                En la máxima medida permitida por la ley, usted renuncia a cualquier derecho a juicio
                por jurado en cualquier procedimiento que surja de o se relacione con estos Términos.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                14.4 Usuarios Internacionales
              </h3>
              <p>
                Si accede al Sitio desde fuera de República Dominicana, usted lo hace por su propia
                iniciativa y es responsable del cumplimiento de las leyes locales aplicables. Ciertos
                servicios o contenidos pueden no estar disponibles en todas las jurisdicciones.
              </p>

              {/* Section 15 */}
              <h2 id="resolucion" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                15. Resolución de Disputas
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                15.1 Negociación Informal
              </h3>
              <p>
                En caso de cualquier controversia, reclamación o disputa que surja de o se relacione
                con estos Términos o el uso del Sitio, las partes acuerdan intentar resolver la
                disputa de manera informal mediante negociaciones de buena fe durante un período de al
                menos treinta (30) días antes de iniciar cualquier procedimiento formal.
              </p>
              <p>
                Para iniciar la negociación informal, debe enviarnos un aviso por escrito a{' '}
                <a href="mailto:info@duosoluciones.com.do" className="text-primary-600 hover:text-primary-800">
                  info@duosoluciones.com.do
                </a>{' '}
                describiendo la naturaleza y base de la reclamación.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">15.2 Mediación</h3>
              <p>
                Si la disputa no se resuelve mediante negociación informal, las partes acuerdan
                intentar resolver la disputa mediante mediación antes de iniciar cualquier acción
                legal o arbitraje. La mediación se llevará a cabo en Santo Domingo, República
                Dominicana, ante un mediador mutuamente acordado.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">15.3 Arbitraje</h3>
              <p>
                Si la disputa no se resuelve mediante negociación informal o mediación dentro de
                noventa (90) días, cualquier reclamación surgida de estos Términos podrá someterse a
                arbitraje vinculante de conformidad con las reglas del Centro de Arbitraje de la
                Cámara de Comercio y Producción de Santo Domingo, o institución similar acordada por
                las partes.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                15.4 Acciones de Emergencia
              </h3>
              <p>
                No obstante lo anterior, DUO se reserva el derecho de solicitar medidas cautelares o
                de emergencia ante los tribunales competentes cuando sea necesario para proteger sus
                derechos de propiedad intelectual o prevenir daños irreparables.
              </p>

              {/* Section 16 */}
              <h2 id="disposiciones" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                16. Disposiciones Generales
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">16.1 Acuerdo Completo</h3>
              <p>
                Estos Términos y Condiciones, junto con nuestra Política de Privacidad y Aviso Legal,
                constituyen el acuerdo completo entre usted y DUO Soluciones Empresariales con
                respecto al uso del Sitio y reemplazan todos los acuerdos, representaciones y
                entendimientos previos o contemporáneos, ya sean escritos u orales.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">16.2 Divisibilidad</h3>
              <p>
                Si cualquier disposición de estos Términos se considera inválida, ilegal o
                inaplicable por un tribunal competente, dicha disposición se eliminará o limitará en
                la mínima medida necesaria, y las disposiciones restantes de estos Términos
                continuarán en pleno vigor y efecto.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">16.3 No Renuncia</h3>
              <p>
                La falta de DUO para ejercer o hacer cumplir cualquier derecho o disposición de estos
                Términos no constituirá una renuncia a dicho derecho o disposición. Cualquier renuncia
                a cualquier disposición de estos Términos solo será efectiva si se hace por escrito y
                está firmada por un representante autorizado de DUO.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">16.4 Cesión</h3>
              <p>
                Usted no puede ceder, transferir o sublicenciar estos Términos o cualquier derecho u
                obligación bajo estos sin el consentimiento previo por escrito de DUO. DUO puede ceder
                o transferir estos Términos, en su totalidad o en parte, sin restricción.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">16.5 Supervivencia</h3>
              <p>
                Las disposiciones que por su naturaleza deban sobrevivir a la terminación de estos
                Términos sobrevivirán, incluyendo pero no limitado a las disposiciones relacionadas
                con Propiedad Intelectual, Limitación de Responsabilidad, Indemnización, Ley Aplicable
                y Resolución de Disputas.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                16.6 Encabezados y Títulos
              </h3>
              <p>
                Los encabezados y títulos de sección en estos Términos son solo para conveniencia y no
                tienen efecto legal o contractual.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                16.7 Idioma
              </h3>
              <p>
                Estos Términos y Condiciones están redactados en español. En caso de existir
                traducciones a otros idiomas, la versión en español prevalecerá en caso de
                discrepancia.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                16.8 Fuerza Mayor
              </h3>
              <p>
                DUO no será responsable por ningún incumplimiento o retraso en el cumplimiento de sus
                obligaciones bajo estos Términos cuando dicho incumplimiento o retraso resulte de
                cualquier causa fuera de nuestro control razonable, incluyendo pero no limitado a:
                desastres naturales, guerras, disturbios civiles, actos de terrorismo, fallas en
                sistemas de telecomunicaciones o internet, pandemias, o cambios en leyes o
                regulaciones.
              </p>

              {/* Section 17 */}
              <h2 id="contacto" className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                17. Contacto
              </h2>
              <p>
                Si tiene preguntas, comentarios o inquietudes sobre estos Términos y Condiciones, o si
                necesita asistencia con el uso del Sitio, puede contactarnos a través de los
                siguientes medios:
              </p>

              <div className="bg-gray-50 rounded-lg p-6 my-6">
                <h3 className="text-xl font-semibold text-gray-900 mt-0 mb-4">
                  DUO Soluciones Empresariales
                </h3>
                <p className="mb-2">
                  <strong>Dirección:</strong> Santo Domingo, República Dominicana
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
                  <strong>Teléfono:</strong>{' '}
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
                  <strong>Horario de Atención:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM (AST)
                </p>
              </div>

              <p className="mt-6">
                Nos esforzamos por responder a todas las consultas dentro de 2-3 días hábiles. Para
                asuntos urgentes, por favor indíquelo claramente en su comunicación.
              </p>

              {/* Footer Links */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Documentos Relacionados</h3>
                <ul className="space-y-2 list-none pl-0">
                  <li>
                    <Link
                      href="/privacidad"
                      className="text-primary-600 hover:text-primary-800 text-lg"
                    >
                      → Política de Privacidad
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
                <p className="text-sm text-gray-700 mb-0">
                  <strong>Nota Importante:</strong> Al utilizar este sitio web, usted reconoce que ha
                  leído, entendido y acepta estar sujeto a estos Términos y Condiciones en su
                  totalidad. Si no está de acuerdo con alguna parte de estos términos, por favor no
                  utilice nuestro sitio web.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
