import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const { userId, credits } = session.metadata as { userId: string; credits: string }

    try {
      // Add credits to user account
      const userRef = doc(db, 'users', userId)
      const userDoc = await getDoc(userRef)

      if (userDoc.exists()) {
        const currentCredits = userDoc.data().credits || 0
        const newCredits = currentCredits + parseInt(credits)

        await updateDoc(userRef, {
          credits: newCredits,
        })

        console.log(`Added ${credits} credits to user ${userId}`)
      }
    } catch (error) {
      console.error('Error adding credits:', error)
      return NextResponse.json({ error: 'Failed to add credits' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
