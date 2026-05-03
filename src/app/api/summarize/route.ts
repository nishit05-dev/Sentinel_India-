import { NextResponse } from 'next/server'
import { geminiFlashModel } from '@/lib/ai'

export async function POST(req: Request) {
  try {
    const { party } = await req.json()
    
    // In a real app, this would fetch the full manifesto text from DB/storage
    const prompt = `Summarize the main points of the election manifesto for ${party} in exactly 2 short sentences. Focus on key policies.`
    
    // If no API key is set, return a mock response
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key') {
      return NextResponse.json({ summary: `[MOCK AI SUMMARY] ${party} focuses on infrastructure development, job creation, and technological advancement in their manifesto.` })
    }

    const result = await geminiFlashModel.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    return NextResponse.json({ summary: text })
  } catch (error) {
    console.error('Error generating summary:', error)
    return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 })
  }
}
