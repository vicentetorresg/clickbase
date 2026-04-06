const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbySihM8c3LDUQkWdIWmKul3I0a0a2eSYpEldKBC-VmS-7oip3_5Bv5qEKo8ds-qPGWMcw/exec'

type AppsScriptMail = {
  subject: string
  body: string
  html: string
}

export async function sendMailViaAppsScript(payload: AppsScriptMail) {
  const res = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error(`Apps Script mail error: ${res.status}`)
  }
}
