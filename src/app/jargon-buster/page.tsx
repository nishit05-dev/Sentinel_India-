'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

export default function JargonBuster() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Namaste! I am the Sentinel AI Jargon Buster. What electoral terms or election processes can I explain to you today? (e.g., What is VVPAT? What does EVM stand for?)' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMsg = input.trim()
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setInput('')
    setLoading(true)

    // Call the API route
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, { role: 'user', content: userMsg }] }),
      })
      
      const data = await response.json().catch(() => ({ error: 'Invalid JSON' }))
      
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
      } else {
        const errorMsg = data.error || 'Server error'
        setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${errorMsg}. I am currently in prototype mode.` }])
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection failed. Please check your internet or try again later.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto flex flex-col">
      <Link href="/" className="text-sky-blue hover:underline mb-8 inline-block">&larr; Back to Home</Link>
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-heading text-white mb-4">Jargon Buster</h1>
        <p className="text-xl text-gray-400">Ask the AI any questions about the Indian electoral system.</p>
      </div>

      <div className="card flex flex-col flex-grow h-[600px] overflow-hidden p-0 border border-white/10">
        {/* Chat Area */}
        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-xl ${msg.role === 'user' ? 'bg-sentinel-green text-gray-900 rounded-tr-none font-medium' : 'bg-white/10 text-white rounded-tl-none border border-white/5'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/10 text-white p-4 rounded-xl rounded-tl-none border border-white/5 animate-pulse">
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/5 border-t border-white/10">
          <form onSubmit={handleSend} className="flex gap-4">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..." 
              className="flex-grow p-4 rounded-md bg-white/10 border border-white/20 text-white outline-none focus:ring-2 focus:ring-sky-blue"
            />
            <button 
              type="submit" 
              disabled={loading || !input.trim()}
              className="btn-primary px-8"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
