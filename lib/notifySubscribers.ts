import { sendMail } from './mailer';
import Subscriber from './models/Subscriber';
import { SITE_URL } from './seo';

/**
 * Emails every subscriber who has notifications enabled about a newly
 * published news article or event.
 */
export async function notifySubscribers(options: {
  subject: string;
  title: string;
  path: string;
}): Promise<void> {
  const subscribers = await Subscriber.listNotifiable();

  if (subscribers.length === 0) return;

  const url = `${SITE_URL}${options.path}`;

  try {
    await sendMail({
      to: process.env.MS_GRAPH_SENDER || subscribers[0].email,
      bcc: subscribers.map((s) => s.email),
      subject: options.subject,
      html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${options.subject}</title>
</head>

<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">

<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f7fb;padding:40px 15px;">
<tr>
<td align="center">

<table role="presentation" width="620" cellspacing="0" cellpadding="0"
style="max-width:620px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;box-shadow:0 8px 24px rgba(0,0,0,.06);">

<!-- Header -->
<tr>
<td
style="background:linear-gradient(135deg,#0f172a,#1e3a8a);padding:40px;text-align:center;color:#fff;">
<h1 style="margin:0;font-size:30px;font-weight:700;">
ICON NUST
</h1>
<p style="margin:10px 0 0;color:#dbeafe;font-size:16px;">
Latest Update
</p>
</td>
</tr>

<!-- Content -->
<tr>
<td style="padding:40px;">

<h2 style="margin:0 0 18px;font-size:28px;color:#0f172a;">
${options.title}
</h2>

<p style="font-size:16px;line-height:1.8;color:#475569;margin:0 0 25px;">
A new article or announcement has just been published on the
<strong>ICON NUST</strong> website.
Stay informed by reading the latest update.
</p>

<div style="text-align:center;margin:35px 0;">
<a href="${url}"
style="
display:inline-block;
padding:14px 34px;
background:#1e40af;
color:#ffffff;
text-decoration:none;
font-weight:600;
font-size:16px;
border-radius:8px;
">
Read Full Article →
</a>
</div>

<p style="font-size:14px;color:#64748b;line-height:1.7;">
If the button above doesn't work, copy and paste the following link into
your browser:
</p>

<p style="word-break:break-word;">
<a href="${url}" style="color:#2563eb;text-decoration:none;">
${url}
</a>
</p>

</td>
</tr>

<!-- Divider -->
<tr>
<td style="padding:0 40px;">
<hr style="border:none;border-top:1px solid #e5e7eb;">
</td>
</tr>

<!-- Footer -->
<tr>
<td style="padding:30px 40px;text-align:center;">

<p style="margin:0;font-size:14px;color:#64748b;">
Thank you for subscribing to
<strong>ICON NUST</strong>.
</p>

<p style="margin:10px 0 0;font-size:13px;color:#94a3b8;">
You're receiving this email because you subscribed to website updates.
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
  } catch (err) {
    console.error('Failed to send subscriber notification email:', err);
  }
}