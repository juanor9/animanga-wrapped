import nodemailer from 'nodemailer';

const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_BASE_URL;
const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@animanga-wrapped.com';

// Create transporter
const createTransporter = () => {
  // Check if using SendGrid
  if (process.env.SENDGRID_API_KEY) {
    return nodemailer.createTransporter({
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY,
      },
    });
  }

  // Use SMTP (Gmail, Outlook, etc.)
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export async function sendMagicLink(email, token) {
  const magicLink = `${BASE_URL}/auth/verify?token=${token}`;

  const transporter = createTransporter();

  const mailOptions = {
    from: `"Animanga Wrapped" <${EMAIL_FROM}>`,
    to: email,
    subject: 'Login to Animanga Wrapped',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background: #ffffff;
              border-radius: 8px;
              padding: 40px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            h1 {
              color: #e43543;
              margin-bottom: 20px;
            }
            .button {
              display: inline-block;
              background: #e43543;
              color: #ffffff;
              text-decoration: none;
              padding: 14px 28px;
              border-radius: 6px;
              font-weight: 600;
              margin: 20px 0;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              font-size: 14px;
              color: #666;
            }
            .link {
              color: #e43543;
              word-break: break-all;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🎬 Login to Animanga Wrapped</h1>
            <p>Hi there!</p>
            <p>Click the button below to log in to your Animanga Wrapped account:</p>
            <a href="${magicLink}" class="button">Log In to Animanga Wrapped</a>
            <p>Or copy and paste this link into your browser:</p>
            <p class="link">${magicLink}</p>
            <div class="footer">
              <p><strong>This link expires in 15 minutes.</strong></p>
              <p>If you didn't request this login link, you can safely ignore this email.</p>
              <p>— The Animanga Wrapped Team</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Login to Animanga Wrapped

Click the link below to log in:
${magicLink}

This link expires in 15 minutes.

If you didn't request this, ignore this email.
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    // eslint-disable-next-line no-console
    console.log(`Magic link sent to ${email}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error sending magic link:', error);
    throw new Error('Failed to send magic link email');
  }
}
