'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function KycDashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [candidates, setCandidates] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    
    setLoading(true)
    try {
      const res = await fetch('/api/candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ constituency: searchQuery })
      })
      const data = await res.json().catch(() => ({ error: 'Invalid response' }))
      
      if (data.candidates) {
        setCandidates(data.candidates)
      } else {
        setCandidates([])
        alert(data.error || "Could not find candidate data.")
      }
    } catch (err) {
      console.error("KYC Fetch error:", err)
      alert("Failed to connect to KYC server.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto flex flex-col">
      <Link href="/" className="text-sky-blue hover:underline mb-8 inline-block">&larr; Back to Home</Link>
      
      <div className="mb-12">
        <h1 className="text-4xl font-bold font-heading text-white mb-4">KYC Dashboard</h1>
        <p className="text-xl text-gray-400">Know Your Candidate. Review real-world backgrounds and AI-summarized manifestos dynamically.</p>
      </div>

      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 w-full md:w-2/3">
          <input 
            type="text" 
            placeholder="Search by constituency (e.g., Varanasi, Wayanad)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 rounded-md bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-sky-blue placeholder-gray-500"
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Searching AI Database...' : 'Fetch Live Candidates'}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {candidates.map((candidate: any, idx: number) => (
          <div key={idx} className="card flex flex-col h-full border-l-4 border-l-sky-blue">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-white">{candidate.name}</h2>
              <p className="text-sentinel-green font-bold">{candidate.party}</p>
              <p className="text-sm text-gray-400 mt-1">{candidate.constituency}</p>
            </div>
            
            <div className="space-y-4 flex-grow text-sm">
              <div>
                <span className="text-gray-500 block mb-1 uppercase tracking-wider text-xs">Education</span>
                <p className="text-white">{candidate.education}</p>
              </div>
              
              <div>
                <span className="text-gray-500 block mb-1 uppercase tracking-wider text-xs">Criminal Records</span>
                <p className={candidate.criminal_records === "None" ? "text-sentinel-green" : "text-warning"}>
                  {candidate.criminal_records}
                </p>
              </div>

              <div>
                <span className="text-gray-500 block mb-1 uppercase tracking-wider text-xs flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-sky-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  AI Manifesto Summary
                </span>
                <p className="text-gray-300 leading-relaxed bg-black/20 p-3 rounded-md border border-white/5">
                  {candidate.manifesto_summary}
                </p>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/10">
              <button className="btn-secondary w-full text-sm">View Full Profile</button>
            </div>
          </div>
        ))}
      </div>
      
      {candidates.length === 0 && !loading && (
        <div className="text-center text-gray-500 mt-12">
          Type an Indian constituency above and let the AI build the dashboard in real-time.
        </div>
      )}
    </div>
  )
}
