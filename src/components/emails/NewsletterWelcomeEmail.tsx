/**
 * Newsletter Welcome Email Template
 *
 * Welcome email sent after user confirms their subscription.
 * Includes introduction to what they can expect and unsubscribe link.
 *
 * @module components/emails/NewsletterWelcomeEmail
 */

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface NewsletterWelcomeEmailProps {
  email: string
  unsubscribeUrl: string
}

export const NewsletterWelcomeEmail = ({
  email,
  unsubscribeUrl,
}: NewsletterWelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Bienvenido al newsletter de DUO Soluciones Empresariales</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>¡Bienvenido a DUO!</Heading>
            <Text style={subtitle}>
              Tu suscripción ha sido confirmada exitosamente
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Welcome Message */}
          <Section style={section}>
            <Text style={text}>
              Gracias por unirte a nuestra comunidad de profesionales comprometidos con la excelencia organizacional.
            </Text>

            <Text style={text}>
              En DUO Soluciones Empresariales, creemos que el desarrollo organizacional es la clave para transformar desafíos en oportunidades sostenibles. A través de nuestro newsletter, compartiremos contigo:
            </Text>

            <div style={featureBox}>
              <Text style={featureTitle}>Contenido Exclusivo</Text>
              <Text style={featureText}>
                • Artículos profundos sobre desarrollo organizacional
                <br />
                • Mejores prácticas de mejora de procesos
                <br />
                • Insights sobre implementación de ERP y MS Dynamics
                <br />
                • Estrategias de gobernanza corporativa
                <br />
                • Casos de éxito y estudios de caso reales
              </Text>
            </div>

            <div style={featureBox}>
              <Text style={featureTitle}>Eventos y Webinars</Text>
              <Text style={featureText}>
                Acceso anticipado a nuestros eventos exclusivos, webinars y talleres especializados.
              </Text>
            </div>

            <div style={featureBox}>
              <Text style={featureTitle}>Podcast "Procesos Que Impulsan"</Text>
              <Text style={featureText}>
                Notificaciones sobre nuevos episodios con expertos en desarrollo organizacional.
              </Text>
            </div>
          </Section>

          <Hr style={hr} />

          {/* Next Steps */}
          <Section style={section}>
            <Heading style={h2}>¿Qué sigue?</Heading>
            <Text style={text}>
              Mientras preparamos tu primer newsletter, te invitamos a explorar nuestros recursos:
            </Text>

            <div style={buttonGroup}>
              <Button href="https://duo-soluciones.com/blog" style={button}>
                Visita Nuestro Blog
              </Button>
              <Button href="https://duo-soluciones.com/podcast" style={buttonSecondary}>
                Escucha el Podcast
              </Button>
            </div>
          </Section>

          <Hr style={hr} />

          {/* Frequency & Preferences */}
          <Section style={section}>
            <Heading style={h2}>Frecuencia de Emails</Heading>
            <Text style={text}>
              Recibirás de 1 a 2 emails por semana con contenido relevante y de valor. Respetamos tu tiempo y tu bandeja de entrada: cero spam, solo contenido útil.
            </Text>

            <Text style={highlightText}>
              Tu email: <strong>{email}</strong>
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              DUO Soluciones Empresariales
              <br />
              Transformamos desafíos en oportunidades sostenibles
            </Text>
            <Text style={footerText}>
              <Link href="https://duo-soluciones.com" style={link}>
                duo-soluciones.com
              </Link>
              {' • '}
              <Link href="https://linkedin.com/company/duo-soluciones" style={link}>
                LinkedIn
              </Link>
            </Text>
            <Hr style={footerHr} />
            <Text style={unsubscribeText}>
              Si cambias de opinión, puedes{' '}
              <Link href={unsubscribeUrl} style={unsubscribeLink}>
                darte de baja en cualquier momento
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default NewsletterWelcomeEmail

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
}

const header = {
  padding: '32px 24px 24px',
  textAlign: 'center' as const,
  backgroundColor: '#1b5e5e',
}

const h1 = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: '700',
  margin: '0 0 8px',
  padding: '0',
  lineHeight: '1.3',
}

const h2 = {
  color: '#1b5e5e',
  fontSize: '22px',
  fontWeight: '600',
  margin: '0 0 16px',
  padding: '0',
}

const subtitle = {
  color: '#e0f2f2',
  fontSize: '16px',
  margin: '0',
  padding: '0',
}

const section = {
  padding: '24px',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '0',
}

const text = {
  color: '#374151',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 16px',
}

const featureBox = {
  backgroundColor: '#f9fafb',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '16px',
}

const featureTitle = {
  color: '#1b5e5e',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 8px',
}

const featureText = {
  color: '#4b5563',
  fontSize: '14px',
  lineHeight: '1.7',
  margin: '0',
}

const buttonGroup = {
  textAlign: 'center' as const,
  margin: '24px 0',
}

const button = {
  backgroundColor: '#1b5e5e',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 28px',
  margin: '0 8px 12px',
  lineHeight: '1.5',
}

const buttonSecondary = {
  backgroundColor: '#ffffff',
  border: '1px solid #1b5e5e',
  borderRadius: '8px',
  color: '#1b5e5e',
  fontSize: '15px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 28px',
  margin: '0 8px 12px',
  lineHeight: '1.5',
}

const highlightText = {
  color: '#374151',
  fontSize: '14px',
  backgroundColor: '#f0f9ff',
  border: '1px solid #bfdbfe',
  borderRadius: '6px',
  padding: '12px',
  margin: '16px 0 0',
  textAlign: 'center' as const,
}

const footer = {
  padding: '0 24px 24px',
  textAlign: 'center' as const,
}

const footerHr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const footerText = {
  color: '#6b7280',
  fontSize: '13px',
  lineHeight: '1.6',
  margin: '8px 0',
}

const link = {
  color: '#1b5e5e',
  textDecoration: 'none',
}

const unsubscribeText = {
  color: '#9ca3af',
  fontSize: '11px',
  lineHeight: '1.6',
  margin: '8px 0',
}

const unsubscribeLink = {
  color: '#9ca3af',
  textDecoration: 'underline',
}
