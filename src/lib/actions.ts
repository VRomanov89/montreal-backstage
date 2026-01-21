'use server'

import { revalidatePath } from 'next/cache'

const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY
const BEEHIIV_PUB_ID = process.env.BEEHIIV_PUBLICATION_ID

export async function subscribe(prevState: any, formData: FormData) {
    const email = formData.get('email')

    if (!email || typeof email !== 'string') {
        return { message: 'Email is required', success: false }
    }

    // Debug for Vercel logs
    console.log(`Attempting subscription for: ${email}`)

    if (!BEEHIIV_API_KEY || !BEEHIIV_PUB_ID) {
        console.warn("Missing Beehiiv keys during subscription attempt.")
        // Simulate success in dev/mock mode so UX can be tested
        return { message: 'Subcribed! (Mock Mode)', success: true }
    }

    try {
        const res = await fetch(
            `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUB_ID}/subscriptions`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${BEEHIIV_API_KEY}`,
                },
                body: JSON.stringify({
                    email: email,
                    reactivate_existing: false,
                    send_welcome_email: true,
                    utm_source: 'montreal-backstage-website',
                    utm_medium: 'organic',
                    utm_campaign: 'website-signup'
                }),
            }
        )

        if (!res.ok) {
            const errorData = await res.json()
            console.error('Beehiiv Subscription Error:', errorData)
            return { message: errorData.errors?.[0]?.message || 'Failed to subscribe', success: false }
        }

        const data = await res.json()
        return { message: 'Success! check your email.', success: true }
    } catch (error) {
        console.error('Subscription error:', error)
        return { message: 'Something went wrong. Please try again.', success: false }
    }
}
