import { NextResponse } from 'next/server'
import { aiChat } from '@/lib/ai'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    console.log('Chat API received messages:', messages.length)
    const lastMessage = messages[messages.length - 1].content
    console.log('Last message:', lastMessage)
    
    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key') {
      console.error('Chat API: Gemini key missing')
      let mockReply = "I am currently in prototype mode and waiting for API keys to be configured. Once connected to Gemini/Groq, I'll be able to explain complex electoral jargon in multiple Indian languages!"
      if (lastMessage.toLowerCase().includes('vvpat')) {
        mockReply = "VVPAT stands for Voter Verifiable Paper Audit Trail. It allows voters to verify their vote. (Mock Response)"
      } else if (lastMessage.toLowerCase().includes('evm')) {
        mockReply = "EVM stands for Electronic Voting Machine. (Mock Response)"
      }
      return NextResponse.json({ reply: mockReply })
    }

    const prompt = `You are the Sentinel India AI Jargon Buster. 
    Explain the following electoral query simply. If asked, translate into regional Indian languages like Hindi, Tamil, Bengali, etc.
    Query: ${lastMessage}`

    const text = await aiChat(prompt)
    
    return NextResponse.json({ reply: text })
  } catch (error) {
    console.error('Error generating chat response:', error)
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 })
  }
}
