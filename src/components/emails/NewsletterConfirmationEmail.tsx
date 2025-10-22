/**
 * Newsletter Confirmation Email Template
 *
 * Double opt-in confirmation email sent when a user signs up for the newsletter.
 * Contains verification link to confirm subscription.
 *
 * @module components/emails/NewsletterConfirmationEmail
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

interface NewsletterConfirmationEmailProps {
  email: string
  confirmationUrl: string
}

export const NewsletterConfirmationEmail = ({
  email,
  confirmationUrl,
}: NewsletterConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Confirma tu suscripción al newsletter de DUO Soluciones</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>Confirma tu Suscripción</Heading>
            <Text style={subtitle}>
              Un paso más para recibir contenido exclusivo
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Main Content */}
          <Section style={section}>
            <Text style={text}>
              Has solicitado suscribirte al newsletter de DUO Soluciones Empresariales usando el email:
            </Text>

            <div style={emailBox}>
              <Text style={emailText}>{email}</Text>
            </div>

            <Text style={text}>
              Para completar tu suscripción y comenzar a recibir nuestros insights sobre desarrollo organizacional, mejora de procesos y transformación empresarial, confirma tu dirección de email haciendo clic en el botón a continuación:
            </Text>

            <div style={buttonContainer}>
              <Button href={confirmationUrl} style={button}>
                Confirmar Suscripción
              </Button>
            </div>

            <Text style={smallText}>
              O copia y pega este enlace en tu navegador:
            </Text>
            <Text style={linkText}>
              <Link href={confirmationUrl} style={link}>
                {confirmationUrl}
              </Link>
            </Text>

            <Text style={expiryText}>
              Este enlace expirará en 24 horas por razones de seguridad.
            </Text>
          </Section>

          <Hr style={hr} />

          {/* What to Expect */}
          <Section style={section}>
            <Heading style={h2}>¿Qué puedes esperar?</Heading>
            <Text style={listText}>
              • Contenido exclusivo sobre desarrollo organizacional
              <br />
              • Insights y mejores prácticas de la industria
              <br />
              • Casos de estudio y ejemplos reales
              <br />
              • Actualizaciones sobre eventos y webinars
              <br />
              • Frecuencia: 1-2 emails por semana (sin spam)
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Si no solicitaste esta suscripción, puedes ignorar este email de forma segura.
            </Text>
            <Text style={footerText}>
              DUO Soluciones Empresariales
              <br />
              Transformamos desafíos en oportunidades sostenibles
              <br />
              <Link href="https://duo-soluciones.com" style={link}>
                duo-soluciones.com
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default NewsletterConfirmationEmail

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
  fontSize: '28px',
  fontWeight: '700',
  margin: '0 0 8px',
  padding: '0',
  lineHeight: '1.3',
}

const h2 = {
  color: '#1b5e5e',
  fontSize: '20px',
  fontWeight: '600',
  margin: '0 0 16px',
  padding: '0',
}

const subtitle = {
  color: '#e0f2f2',
  fontSize: '14px',
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

const emailBox = {
  backgroundColor: '#f0fdf4',
  border: '1px solid #86efac',
  borderRadius: '8px',
  padding: '12px 16px',
  margin: '16px 0',
  textAlign: 'center' as const,
}

const emailText = {
  color: '#166534',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#1b5e5e',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 32px',
  lineHeight: '1.5',
}

const smallText = {
  color: '#6b7280',
  fontSize: '13px',
  lineHeight: '1.5',
  margin: '24px 0 8px',
  textAlign: 'center' as const,
}

const linkText = {
  color: '#1b5e5e',
  fontSize: '13px',
  lineHeight: '1.5',
  margin: '0 0 8px',
  textAlign: 'center' as const,
  wordBreak: 'break-all' as const,
}

const link = {
  color: '#1b5e5e',
  textDecoration: 'underline',
}

const expiryText = {
  color: '#dc2626',
  fontSize: '13px',
  lineHeight: '1.5',
  margin: '16px 0 0',
  textAlign: 'center' as const,
  fontWeight: '500',
}

const listText = {
  color: '#4b5563',
  fontSize: '14px',
  lineHeight: '1.8',
  margin: '0',
}

const footer = {
  padding: '0 24px 24px',
  textAlign: 'center' as const,
}

const footerText = {
  color: '#9ca3af',
  fontSize: '12px',
  lineHeight: '1.6',
  margin: '8px 0',
}
