import { NextRequest, NextResponse } from 'next/server'
import Replicate from 'replicate'
import { db } from '@/lib/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const mask = formData.get('mask') as string
    const userId = formData.get('userId') as string

    if (!file || !mask || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Get user credits
    const userRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userRef)
    
    if (!userDoc.exists()) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const userData = userDoc.data()
    const currentCredits = userData.credits || 0

    // Calculate cost (simplified - should be more sophisticated)
    const cost = file.type.startsWith('image/') ? 5 : 8
    
    if (currentCredits < cost) {
      return NextResponse.json({ error: 'Insufficient credits' }, { status: 402 })
    }

    // Convert file to base64 for Replicate
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const dataUrl = `data:${file.type};base64,${base64}`

    // Process with Replicate (using stable-diffusion-inpainting)
    const output = await replicate.run(
      "stability-ai/stable-diffusion-inpainting:95b7223104132402a9ae91cc677285bc5eb997834bd2349fa486f53910fd68b3",
      {
        input: {
          image: dataUrl,
          mask: mask,
          prompt: "high quality, detailed",
          num_outputs: 1,
        }
      }
    ) as string[]

    // Deduct credits
    await updateDoc(userRef, {
      credits: currentCredits - cost,
    })

    return NextResponse.json({
      success: true,
      resultUrl: output[0],
      remainingCredits: currentCredits - cost,
    })
  } catch (error) {
    console.error('Processing error:', error)
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
  }
}
