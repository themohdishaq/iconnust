import { sendMail, renderKeyValueEmail } from './mailer';

export type NotificationSource =
  | 'home'
  | 'industry-services'
  | 'innovation-collaboration'
  | 'invention-disclosure';

const RECIPIENT_ENV: Record<NotificationSource, string> = {
  home: 'NOTIFY_EMAIL_HOME',
  'industry-services': 'NOTIFY_EMAIL_INDUSTRY_SERVICES',
  'innovation-collaboration': 'NOTIFY_EMAIL_INNOVATION_COLLABORATION',
  'invention-disclosure': 'NOTIFY_EMAIL_DISCLOSURES',
};

const SOURCE_LABELS: Record<NotificationSource, string> = {
  home: 'General Inquiries',
  'industry-services': 'Industry Services',
  'innovation-collaboration': 'Innovation & Collaboration',
  'invention-disclosure': 'Invention Disclosures (Commercialization / TTO)',
};

export async function notifyDepartment(source: NotificationSource, rows: Array<[string, string]>): Promise<void> {
  const to = process.env[RECIPIENT_ENV[source]];
  if (!to) {
    console.warn(`No recipient configured for ${RECIPIENT_ENV[source]} — skipping department notification.`);
    return;
  }

  const label = SOURCE_LABELS[source];
  try {
    await sendMail({
      to,
      subject: `New Submission — ${label}`,
      html: renderKeyValueEmail(`New Submission — ${label}`, rows),
    });
  } catch (err) {
    console.error(`Failed to send department notification email for "${source}":`, err);
  }
}
