/**
 * Contact Email Template
 *
 * Email template sent to DUO Soluciones when a contact form is submitted.
 * Displays all form data in a professional, branded format.
 *
 * @module components/emails/ContactEmail
 */

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface ContactEmailProps {
  name: string;
  email: string;
  company?: string;
  service: string;
  message: string;
  submittedAt?: string;
}

export const ContactEmail = ({
  name,
  email,
  company,
  service,
  message,
  submittedAt = new Date().toLocaleString('es-MX', {
    timeZone: 'America/Mexico_City',
    dateStyle: 'full',
    timeStyle: 'short',
  }),
}: ContactEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Nuevo contacto de {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>Nuevo Mensaje de Contacto</Heading>
            <Text style={subtitle}>
              Recibiste un nuevo mensaje desde el formulario de contacto
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Contact Information */}
          <Section style={section}>
            <Heading style={h2}>Información del Contacto</Heading>

            <div style={infoRow}>
              <Text style={label}>Nombre:</Text>
              <Text style={value}>{name}</Text>
            </div>

            <div style={infoRow}>
              <Text style={label}>Email:</Text>
              <Text style={value}>
                <a href={`mailto:${email}`} style={link}>
                  {email}
                </a>
              </Text>
            </div>

            {company && (
              <div style={infoRow}>
                <Text style={label}>Empresa:</Text>
                <Text style={value}>{company}</Text>
              </div>
            )}

            <div style={infoRow}>
              <Text style={label}>Servicio de Interés:</Text>
              <Text style={value}>{service}</Text>
            </div>

            <div style={infoRow}>
              <Text style={label}>Fecha y Hora:</Text>
              <Text style={value}>{submittedAt}</Text>
            </div>
          </Section>

          <Hr style={hr} />

          {/* Message Content */}
          <Section style={section}>
            <Heading style={h2}>Mensaje</Heading>
            <div style={messageBox}>
              <Text style={messageText}>{message}</Text>
            </div>
          </Section>

          <Hr style={hr} />

          {/* Action Items */}
          <Section style={section}>
            <Heading style={h2}>Próximos Pasos</Heading>
            <Text style={actionText}>
              1. Revisa la información del contacto y el mensaje
              <br />
              2. Responde al cliente en las próximas 24 horas
              <br />
              3. Registra el contacto en tu CRM
              <br />
              4. Programa una llamada de seguimiento si es necesario
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Este email fue enviado automáticamente desde el formulario de
              contacto de{' '}
              <a href="https://duo-soluciones.com" style={link}>
                DUO Soluciones Empresariales
              </a>
            </Text>
            <Text style={footerText}>
              Para responder, usa el botón &quot;Responder&quot; en tu cliente
              de email
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactEmail;

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
  margin: '0 0 8px',
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

const subtitle = {
  color: '#e0f2f2',
  fontSize: '14px',
  margin: '0',
  padding: '0',
};

const section = {
  padding: '24px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '0',
};

const infoRow = {
  marginBottom: '16px',
};

const label = {
  color: '#6b7280',
  fontSize: '13px',
  fontWeight: '600',
  margin: '0 0 4px',
  padding: '0',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
};

const value = {
  color: '#1f2937',
  fontSize: '16px',
  margin: '0',
  padding: '0',
  lineHeight: '1.5',
};

const link = {
  color: '#1b5e5e',
  textDecoration: 'none',
  fontWeight: '500',
};

const messageBox = {
  backgroundColor: '#f9fafb',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '16px',
  marginTop: '8px',
};

const messageText = {
  color: '#374151',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const actionText = {
  color: '#4b5563',
  fontSize: '14px',
  lineHeight: '1.8',
  margin: '0',
};

const footer = {
  padding: '0 24px 24px',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#9ca3af',
  fontSize: '12px',
  lineHeight: '1.6',
  margin: '8px 0',
};
