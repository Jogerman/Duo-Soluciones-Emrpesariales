/**
 * Auto-Response Email Template
 *
 * Email template sent to users after they submit the contact form.
 * Provides confirmation and sets expectations for response time.
 *
 * @module components/emails/AutoResponseEmail
 */

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface AutoResponseEmailProps {
  name: string;
}

export const AutoResponseEmail = ({ name }: AutoResponseEmailProps) => {
  const firstName = name.split(' ')[0]; // Get first name for personalization

  return (
    <Html>
      <Head />
      <Preview>Gracias por contactar a DUO Soluciones Empresariales</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>¡Gracias por contactarnos!</Heading>
          </Section>

          <Hr style={hr} />

          {/* Main Content */}
          <Section style={section}>
            <Text style={greeting}>Hola {firstName},</Text>

            <Text style={paragraph}>
              Hemos recibido tu mensaje y queremos agradecerte por tu interés
              en <strong>DUO Soluciones Empresariales</strong>.
            </Text>

            <Text style={paragraph}>
              Nuestro equipo de consultores revisará tu solicitud
              cuidadosamente y te responderemos en un plazo máximo de{' '}
              <strong>24 a 48 horas hábiles</strong>.
            </Text>
          </Section>

          <Hr style={hr} />

          {/* What Happens Next */}
          <Section style={section}>
            <Heading style={h2}>¿Qué sigue?</Heading>

            <div style={stepContainer}>
              <div style={step}>
                <div style={stepNumber}>1</div>
                <div style={stepContent}>
                  <Text style={stepTitle}>Revisión de tu mensaje</Text>
                  <Text style={stepText}>
                    Nuestro equipo analizará tus necesidades y el servicio de
                    tu interés
                  </Text>
                </div>
              </div>

              <div style={step}>
                <div style={stepNumber}>2</div>
                <div style={stepContent}>
                  <Text style={stepTitle}>Respuesta personalizada</Text>
                  <Text style={stepText}>
                    Te contactaremos para discutir cómo podemos ayudarte
                  </Text>
                </div>
              </div>

              <div style={step}>
                <div style={stepNumber}>3</div>
                <div style={stepContent}>
                  <Text style={stepTitle}>Consulta inicial</Text>
                  <Text style={stepText}>
                    Agendaremos una llamada o reunión para conocer más detalles
                  </Text>
                </div>
              </div>
            </div>
          </Section>

          <Hr style={hr} />

          {/* Company Information */}
          <Section style={section}>
            <Heading style={h2}>Mientras tanto...</Heading>

            <Text style={paragraph}>
              Te invitamos a conocer más sobre nuestros servicios:
            </Text>

            <div style={linkList}>
              <Text style={linkItem}>
                <Link
                  href="https://duo-soluciones.com/servicios"
                  style={link}
                >
                  Nuestros Servicios
                </Link>
              </Text>
              <Text style={linkItem}>
                <Link
                  href="https://duo-soluciones.com/casos-de-exito"
                  style={link}
                >
                  Casos de Éxito
                </Link>
              </Text>
              <Text style={linkItem}>
                <Link href="https://duo-soluciones.com/blog" style={link}>
                  Blog y Recursos
                </Link>
              </Text>
              <Text style={linkItem}>
                <Link href="https://duo-soluciones.com/podcast" style={link}>
                  Podcast Corporativo
                </Link>
              </Text>
            </div>
          </Section>

          <Hr style={hr} />

          {/* Contact Information */}
          <Section style={section}>
            <Heading style={h2}>¿Necesitas ayuda inmediata?</Heading>

            <Text style={paragraph}>
              Si tu consulta es urgente, no dudes en contactarnos directamente:
            </Text>

            <div style={contactInfo}>
              <Text style={contactItem}>
                <strong>Email:</strong>{' '}
                <Link href="mailto:info@duo-soluciones.com" style={link}>
                  info@duo-soluciones.com
                </Link>
              </Text>
              <Text style={contactItem}>
                <strong>Teléfono:</strong> +52 (55) 1234-5678
              </Text>
              <Text style={contactItem}>
                <strong>WhatsApp:</strong> +52 (55) 1234-5678
              </Text>
              <Text style={contactItem}>
                <strong>Horario:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM
                (Hora de México)
              </Text>
            </div>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerTitle}>DUO Soluciones Empresariales</Text>
            <Text style={footerText}>
              Consultoría especializada en Desarrollo Organizacional, Mejora de
              Procesos, Implementación ERP y Gobernanza Corporativa
            </Text>

            <div style={socialLinks}>
              <Link
                href="https://linkedin.com/company/duo-soluciones"
                style={socialLink}
              >
                LinkedIn
              </Link>
              {' · '}
              <Link href="https://duo-soluciones.com" style={socialLink}>
                Sitio Web
              </Link>
              {' · '}
              <Link
                href="https://duo-soluciones.com/blog"
                style={socialLink}
              >
                Blog
              </Link>
            </div>

            <Text style={footerDisclaimer}>
              Este es un mensaje automático. Por favor no respondas a este
              correo.
              <br />
              Si tienes preguntas, escríbenos a{' '}
              <Link href="mailto:info@duo-soluciones.com" style={link}>
                info@duo-soluciones.com
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default AutoResponseEmail;

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const header = {
  padding: '32px 24px 24px',
  textAlign: 'center' as const,
  backgroundColor: '#1b5e5e',
};

const h1 = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: '700',
  margin: '0',
  padding: '0',
  lineHeight: '1.3',
};

const h2 = {
  color: '#1b5e5e',
  fontSize: '20px',
  fontWeight: '600',
  margin: '0 0 16px',
  padding: '0',
};

const section = {
  padding: '24px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '0',
};

const greeting = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 16px',
  padding: '0',
};

const paragraph = {
  color: '#4b5563',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 16px',
  padding: '0',
};

const stepContainer = {
  marginTop: '16px',
};

const step = {
  display: 'flex',
  marginBottom: '20px',
  alignItems: 'flex-start',
};

const stepNumber = {
  backgroundColor: '#1b5e5e',
  color: '#ffffff',
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: '600',
  fontSize: '16px',
  marginRight: '16px',
  flexShrink: 0,
};

const stepContent = {
  flex: 1,
};

const stepTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 4px',
  padding: '0',
};

const stepText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0',
  padding: '0',
};

const linkList = {
  marginTop: '12px',
};

const linkItem = {
  margin: '8px 0',
  padding: '0',
};

const link = {
  color: '#1b5e5e',
  textDecoration: 'none',
  fontWeight: '500',
};

const contactInfo = {
  backgroundColor: '#f9fafb',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '16px',
  marginTop: '12px',
};

const contactItem = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '1.8',
  margin: '4px 0',
  padding: '0',
};

const footer = {
  padding: '0 24px 24px',
  textAlign: 'center' as const,
  borderTop: '1px solid #e6ebf1',
  marginTop: '32px',
  paddingTop: '24px',
};

const footerTitle = {
  color: '#1b5e5e',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 8px',
  padding: '0',
};

const footerText = {
  color: '#6b7280',
  fontSize: '13px',
  lineHeight: '1.6',
  margin: '0 0 16px',
  padding: '0',
};

const socialLinks = {
  margin: '16px 0',
};

const socialLink = {
  color: '#1b5e5e',
  textDecoration: 'none',
  fontSize: '13px',
  fontWeight: '500',
};

const footerDisclaimer = {
  color: '#9ca3af',
  fontSize: '11px',
  lineHeight: '1.6',
  margin: '16px 0 0',
  padding: '0',
};
