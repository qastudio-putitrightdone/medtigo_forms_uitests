// @ts-check
import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';

const GMAIL_IMAP_HOST = 'imap.gmail.com';
const GMAIL_IMAP_PORT = 993;

function getCredentials() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error(
      'GMAIL_USER and GMAIL_APP_PASSWORD must be set to read email (e.g. via a local, ' +
        'gitignored .env file — see .env.example). GMAIL_APP_PASSWORD must be a Google ' +
        'App Password, not the account login password.'
    );
  }
  return { user, pass };
}

/**
 * Polls the Gmail inbox (IMAP) until a message matching `subject` + `to` is found,
 * or throws once `timeoutMs` elapses.
 *
 * @param {{
 *   subject: string,
 *   to: string,
 *   timeoutMs?: number,
 *   pollIntervalMs?: number,
 *   sinceMinutesAgo?: number,
 * }} criteria
 */
async function waitForEmail({
  subject,
  to,
  timeoutMs = 120_000,
  pollIntervalMs = 5_000,
  sinceMinutesAgo = 15,
}) {
  const { user, pass } = getCredentials();
  const since = new Date(Date.now() - sinceMinutesAgo * 60_000);
  const deadline = Date.now() + timeoutMs;

  while (true) {
    const client = new ImapFlow({
      host: GMAIL_IMAP_HOST,
      port: GMAIL_IMAP_PORT,
      secure: true,
      auth: { user, pass },
      logger: false,
    });

    await client.connect();
    try {
      const lock = await client.getMailboxLock('INBOX');
      try {
        const uids = await client.search({ header: { subject, to }, since }, { uid: true });
        if (uids && uids.length > 0) {
          const latestUid = uids[uids.length - 1];
          const message = await client.fetchOne(latestUid, { source: true }, { uid: true });
          return simpleParser(message.source);
        }
      } finally {
        lock.release();
      }
    } finally {
      await client.logout();
    }

    if (Date.now() >= deadline) {
      throw new Error(
        `Timed out after ${timeoutMs}ms waiting for an email with subject "${subject}" to "${to}".`
      );
    }
    await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
  }
}

export { waitForEmail };
