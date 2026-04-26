import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
const FROM_NAME = 'The Unwrite Project';

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
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    timeZone: 'Europe/Bucharest'
  });
  const time = date.toLocaleTimeString('en-GB', { 
    hour: '2-digit', minute: '2-digit',
    timeZone: 'Europe/Bucharest'
  });
  const openLink = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/open/${token}`;

  await resend.emails.send({
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to,
    subject: to.split('@')[0] + ' — your words are sealed.',
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
                The Unwrite Project
              </p>
            </td>
          </tr>

          <!-- Main -->
          <tr>
            <td style="padding:60px 40px 30px;text-align:center;">
              <h1 style="margin:0 0 20px;font-size:40px;font-weight:300;line-height:1.2;color:#ffffff;">
                Your capsule has been<br>sealed and sent.
              </h1>
              ${capsuleTitle ? `<p style="margin:0 0 30px;font-size:18px;font-style:italic;color:rgba(255,255,255,0.4);">"${capsuleTitle}"</p>` : ''}
              <p style="margin:0 0 8px;font-size:14px;color:rgba(255,255,255,0.35);line-height:1.8;">
                It will be delivered on
              </p>
              <p style="margin:0 0 40px;font-size:20px;font-style:italic;color:#C9956C;">
                ${formatted} at ${time}
              </p>
              <a href="${openLink}" style="display:inline-block;background:#C9956C;color:#080808;padding:18px 48px;border-radius:4px;font-size:12px;letter-spacing:0.25em;text-transform:uppercase;font-weight:500;text-decoration:none;">
                View your capsule →
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
    love: 'A letter written with love is waiting for you.',
    hope: 'Someone kept something hopeful for you.',
    regret: 'A letter from the past found its way to you.',
    promise: 'A promise made to you is ready.',
    for_kids: 'Someone wrote you a letter.',
    forgive: 'Someone wanted you to have this.',
    remember_me: 'Someone wanted you to remember.',
    gratitude: 'Someone thought of you today.',
    courage: 'Someone believed in you. This is proof.',
    goodbye: 'A final letter is waiting for you.',
    proud: 'Someone is proud of you. Read this.',
  };

  const subject = mood && moodSubjects[mood]
    ? moodSubjects[mood]
    : 'A letter from your past is waiting.';

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
                The Unwrite Project
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