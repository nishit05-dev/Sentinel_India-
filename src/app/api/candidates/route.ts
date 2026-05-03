import { NextResponse } from 'next/server'
import { aiChat } from '@/lib/ai'

export async function POST(req: Request) {
  try {
    const { constituency } = await req.json()
    
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key') {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    const prompt = `You are a political data assistant for India. 
    The user is asking for the real-world prominent politicians/candidates in the Indian constituency of: "${constituency}".
    Return the response as a strict JSON array of objects. Do not include markdown formatting or backticks.
    Format each object exactly like this:
    {
      "id": 1,
      "name": "Candidate Name",
      "party": "Political Party",
      "constituency": "${constituency}",
      "education": "Brief education summary",
      "criminal_records": "None or brief description",
      "manifesto_summary": "2 sentence summary of their known political stance or manifesto."
    }
    Generate up to 3 candidates.`

    let text = await aiChat(prompt)
    if (!text) throw new Error('AI returned no text')
    
    // Clean up markdown backticks if AI ignores prompt
    text = text.replace(/```json/g, '').replace(/```/g, '').trim()
    
    const candidates = JSON.parse(text)
    
    return NextResponse.json({ candidates })
  } catch (error) {
    console.error('Error fetching candidates:', error)
    return NextResponse.json({ error: 'Failed to fetch candidates from AI' }, { status: 500 })
  }
}
