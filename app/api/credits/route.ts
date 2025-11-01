import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const userRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      // Create new user with free credits
      await setDoc(userRef, {
        credits: 20,
        createdAt: new Date().toISOString(),
      })
      return NextResponse.json({ credits: 20 })
    }

    const userData = userDoc.data()
    return NextResponse.json({ credits: userData.credits || 0 })
  } catch (error) {
    console.error('Credits fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch credits' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, credits } = await request.json()

    if (!userId || credits === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const userRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const currentCredits = userDoc.data().credits || 0
    const newCredits = currentCredits + credits

    await setDoc(userRef, { credits: newCredits }, { merge: true })

    return NextResponse.json({ success: true, credits: newCredits })
  } catch (error) {
    console.error('Credits update error:', error)
    return NextResponse.json({ error: 'Failed to update credits' }, { status: 500 })
  }
}
