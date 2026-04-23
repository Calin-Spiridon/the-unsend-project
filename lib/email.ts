import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
const FROM_NAME = 'The Unsend Project';

export async function sendConfirmationEmail({
  to,
  capsuleTitle,
  openDate,
  token,
  locale,
}: {
  to: string;
  capsuleTitle: string | null;
  openDate: string;
  token: string;
  locale: string;
}) {
  const date = new Date(openDate);
  const formatted = date.toLocaleDateString('en-GB', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const time = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const openLink = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/open/${token}`;

  await resend.emails.send({
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to,
    subject: 'Your message is sealed.',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#080808;font-family:'Georgia',serif;color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#080808;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          
          <!-- Header -->
          <tr>
            <td style="padding:40px 0 20px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:rgba(255,255,255,0.3);">
                The Unsend Project
              </p>
            </td>
          </tr>

          <!-- Seal icon -->
          <tr>
            <td style="padding:50px 0 20px;text-align:center;">
              <div style="width:70px;height:70px;border-radius:50%;border:1px solid rgba(201,149,108,0.3);background:rgba(201,149,108,0.06);margin:0 auto;display:flex;align-items:center;justify-content:center;">
                <p style="margin:0;font-size:28px;color:#C9956C;">◈</p>
              </div>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:10px 40px 0;text-align:center;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:rgba(201,149,108,0.7);">sealed</p>
              <h1 style="margin:0 0 20px;font-size:36px;font-weight:300;line-height:1.2;color:#ffffff;">
                Your message is sealed.
              </h1>
              ${capsuleTitle ? `<p style="margin:0 0 16px;font-size:18px;font-style:italic;color:rgba(255,255,255,0.5);">"${capsuleTitle}"</p>` : ''}
              <p style="margin:0 0 8px;font-size:14px;color:rgba(255,255,255,0.35);line-height:1.6;">
                It will be waiting on
              </p>
              <p style="margin:0;font-size:20px;font-style:italic;color:#C9956C;">
                ${formatted} at ${time}
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:30px 40px;">
              <div style="width:40px;height:1px;background:rgba(255,255,255,0.1);margin:0 auto;"></div>
            </td>
          </tr>

          <!-- Info box -->
          <tr>
            <td style="padding:0 40px 30px;">
              <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:24px;">
                <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.35);line-height:1.8;text-align:center;">
                  We'll send a notification when it's time to open it.<br>
                  Or share the link below whenever you're ready.
                </p>
              </div>
            </td>
          </tr>

          <!-- Link -->
          <tr>
            <td style="padding:0 40px 40px;text-align:center;">
              <p style="margin:0 0 16px;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:rgba(255,255,255,0.25);">
                your capsule link
              </p>
              <a href="${openLink}" style="display:block;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:14px 20px;font-family:monospace;font-size:11px;color:rgba(201,149,108,0.7);text-decoration:none;word-break:break-all;">
                ${openLink}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:30px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);">
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.15);font-style:italic;">
                Some words deserve to wait.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  });
}

export async function sendOpenEmail({
  to,
  capsuleTitle,
  token,
  locale,
  mood,
}: {
  to: string;
  capsuleTitle: string | null;
  token: string;
  locale: string;
  mood: string | null;
}) {
  const openLink = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/open/${token}`;

  const moodSubjects: Record<string, string> = {
    love: 'A message of love is waiting for you.',
    hope: 'Something hopeful was left for you.',
    regret: 'Someone wanted you to have this.',
    promise: 'A promise is ready to be kept.',
    for_kids: 'A letter is waiting for you.',
    forgive: 'Something was left for you.',
    remember_me: 'Someone wanted you to remember.',
    gratitude: 'Someone is grateful for you.',
    courage: 'You have what it takes. Open this.',
    goodbye: 'Something was left for you.',
    proud: 'Someone is proud of you.',
  };

  const subject = mood && moodSubjects[mood]
    ? moodSubjects[mood]
    : 'Something was left for you.';

  await resend.emails.send({
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to,
    subject,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#080808;font-family:'Georgia',serif;color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#080808;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding:40px 0 20px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:rgba(255,255,255,0.3);">
                The Unsend Project
              </p>
            </td>
          </tr>

          <!-- Main -->
          <tr>
            <td style="padding:60px 40px 30px;text-align:center;">
              <h1 style="margin:0 0 20px;font-size:40px;font-weight:300;line-height:1.2;color:#ffffff;">
                Your past is ready<br>to meet you.
              </h1>
              ${capsuleTitle ? `<p style="margin:0 0 30px;font-size:18px;font-style:italic;color:rgba(255,255,255,0.4);">"${capsuleTitle}"</p>` : ''}
              <p style="margin:0 0 40px;font-size:15px;color:rgba(255,255,255,0.35);line-height:1.8;">
                A message was sealed for this moment.<br>
                It's been waiting. Now it's time.
              </p>
              <a href="${openLink}" style="display:inline-block;background:#C9956C;color:#080808;padding:18px 48px;border-radius:4px;font-size:12px;letter-spacing:0.25em;text-transform:uppercase;font-weight:500;text-decoration:none;">
                Open your message →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:40px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);">
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.15);font-style:italic;">
                Some words deserve to wait.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  });
}