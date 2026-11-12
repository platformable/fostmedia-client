const BEEHIIV_API = "https://api.beehiiv.com/v2"
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

let cachedPublicationId: string | undefined

async function getPublicationId(apiKey: string): Promise<string | undefined> {
  if (process.env.BEEHIIV_PUBLICATION_ID) return process.env.BEEHIIV_PUBLICATION_ID
  if (cachedPublicationId) return cachedPublicationId

  const res = await fetch(`${BEEHIIV_API}/publications`, {
    headers: { Authorization: `Bearer ${apiKey}` },
    cache: "no-store",
  })
  if (!res.ok) return undefined
  const json = await res.json()
  cachedPublicationId = json?.data?.[0]?.id
  return cachedPublicationId
}

export async function POST(request: Request) {
  const apiKey = process.env.BEEHIIV_API_KEY
  if (!apiKey) {
    return Response.json({ error: "Newsletter is not configured." }, { status: 500 })
  }

  let email = ""
  try {
    const body = await request.json()
    email = String(body?.email ?? "").trim().toLowerCase()
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 })
  }

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 })
  }

  try {
    const publicationId = await getPublicationId(apiKey)
    if (!publicationId) {
      return Response.json({ error: "Newsletter is not configured." }, { status: 500 })
    }

    const res = await fetch(`${BEEHIIV_API}/publications/${publicationId}/subscriptions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        reactivate_existing: false,
        send_welcome_email: true,
        utm_source: "fost-website",
        utm_medium: "newsletter-banner",
      }),
      cache: "no-store",
    })

    if (!res.ok) {
      return Response.json(
        { error: "Could not subscribe right now. Please try again." },
        { status: 502 }
      )
    }
    const json = await res.json().catch(() => null)
    // Beehiiv upserts by email: an existing subscriber comes back with an old `created` timestamp (unix seconds).
    const created = Number(json?.data?.created)
    const alreadySubscribed =
      Number.isFinite(created) && Date.now() / 1000 - created > 120
    return Response.json({ ok: true, alreadySubscribed })
  } catch {
    return Response.json(
      { error: "Could not subscribe right now. Please try again." },
      { status: 502 }
    )
  }
}
