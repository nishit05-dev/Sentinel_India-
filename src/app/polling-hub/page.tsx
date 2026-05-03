'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useState, useEffect, useMemo } from 'react'

const Map = dynamic(() => import('@/components/Map'), { 
  ssr: false,
  loading: () => <div className="h-full w-full flex items-center justify-center bg-white/5 animate-pulse rounded-md">Loading Map...</div>
})

const INITIAL_BOOTHS = [
  { id: 1, name: "St. Mary's School", address: "Sector 3, New Delhi", latitude: 28.6139, longitude: 77.2090, distance: "0.8 km" },
  { id: 2, name: "Community Hall", address: "Sector 5, New Delhi", latitude: 28.6200, longitude: 77.2150, distance: "1.2 km" },
  { id: 3, name: "Govt. High School", address: "Sector 1, New Delhi", latitude: 28.6050, longitude: 77.2000, distance: "2.1 km" },
]

export default function PollingHub() {
  const [booths, setBooths] = useState(INITIAL_BOOTHS)
  const [selectedBooth, setSelectedBooth] = useState(INITIAL_BOOTHS[0])
  const [savedSlip, setSavedSlip] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isSaved = localStorage.getItem('voterSlip')
      if (isSaved) setSavedSlip(true)
    }
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    
    setSearching(true)
    try {
      // 1. Get the main location coordinates
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`)
      const data = await res.json()
      
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0]
        const mainLat = parseFloat(lat)
        const mainLon = parseFloat(lon)

        // 2. Search for nearby "Schools" or "Community Centers" to act as real polling booths
        // We'll search within the same area
        const boothRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=school+near+${encodeURIComponent(searchQuery)}&limit=5`)
        const boothData = await boothRes.json()

        const foundBooths = boothData.map((b: any, index: number) => ({
          id: `${Date.now()}-${index}`,
          name: b.display_name.split(',')[0], // Take the first part of the name
          address: b.display_name,
          latitude: parseFloat(b.lat),
          longitude: parseFloat(b.lon),
          distance: `${(index + 1) * 0.4} km`
        }))

        if (foundBooths.length > 0) {
          setBooths(foundBooths)
          setSelectedBooth(foundBooths[0])
        } else {
          // Fallback if no specific booths found
          const fallbackBooth = {
            id: `${Date.now()}-main`,
            name: searchQuery + " Polling Center",
            address: display_name,
            latitude: mainLat,
            longitude: mainLon,
            distance: "Live"
          }
          setBooths([fallbackBooth])
          setSelectedBooth(fallbackBooth)
        }
      } else {
        alert("Location not found!")
      }
    } catch (error) {
      console.error("Search failed", error)
    } finally {
      setSearching(false)
    }
  }

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        const newBooth = {
          id: Date.now(),
          name: "Your Live Location",
          address: "Geolocation API coordinates",
          latitude,
          longitude,
          distance: "0 km"
        }
        setBooths(prev => [...prev, newBooth])
        setSelectedBooth(newBooth)
      }, (error) => {
        console.error("Error getting location", error)
      })
    }
  }

  const handleDownload = () => {
    localStorage.setItem('voterSlip', JSON.stringify({ boothId: selectedBooth.id, name: 'Rohan Kumar' }))
    setSavedSlip(true)
    alert("Voter slip saved offline!")
  }

  const mapCenter = useMemo(() => [selectedBooth.latitude, selectedBooth.longitude] as [number, number], [selectedBooth.latitude, selectedBooth.longitude])

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <Link href="/" className="text-sky-blue hover:underline">&larr; Back to Home</Link>
        <button onClick={handleLocateMe} className="btn-secondary flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Find Nearest Booth
        </button>
      </div>
      
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold font-heading text-white mb-4">Smart Polling Hub</h1>
          <p className="text-xl text-gray-400">Locate your polling booth dynamically and access your digital voter slip.</p>
        </div>
        <form onSubmit={handleSearch} className="flex w-full md:w-auto gap-2">
          <input 
            type="text" 
            placeholder="Search city, district, or address..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-3 rounded-md bg-white/10 border border-white/20 text-white outline-none focus:ring-2 focus:ring-sky-blue flex-grow"
          />
          <button type="submit" className="btn-primary" disabled={searching}>
            {searching ? '...' : 'Search'}
          </button>
        </form>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-grow h-[600px]">
        
        {/* Sidebar */}
        <div className="w-full lg:w-1/3 flex flex-col space-y-6">
          <div className="card">
            <h2 className="text-2xl font-bold text-white mb-4">Your Digital Slip</h2>
            <div className="bg-white/10 p-4 rounded-md border border-white/20">
              <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-2">
                <span className="text-gray-400 text-sm">Voter Name</span>
                <span className="text-white font-bold">Rohan Kumar</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-2">
                <span className="text-gray-400 text-sm">EPIC No.</span>
                <span className="text-sky-blue font-bold">XYZ1234567</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Booth Name</span>
                <span className="text-sentinel-green font-bold text-right">{selectedBooth.name}</span>
              </div>
              
              <button onClick={handleDownload} className={`${savedSlip ? 'btn-secondary' : 'btn-primary'} w-full mt-6 flex items-center justify-center gap-2`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {savedSlip ? 'Saved Offline' : 'Download for Offline'}
              </button>
            </div>
          </div>

          <div className="card flex-grow overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4">Nearby Booths</h2>
            <div className="space-y-3">
              {booths.map((booth) => (
                <div 
                  key={booth.id} 
                  className={`p-3 rounded-md cursor-pointer border transition-colors ${selectedBooth.id === booth.id ? 'bg-sky-blue/20 border-sky-blue' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                  onClick={() => setSelectedBooth(booth)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-bold">{booth.name}</h3>
                      <p className="text-gray-400 text-sm">{booth.address}</p>
                    </div>
                    <span className="bg-black/40 text-sentinel-green text-xs px-2 py-1 rounded">{booth.distance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="w-full lg:w-2/3 h-full rounded-md overflow-hidden border border-white/10 relative">
          <Map center={mapCenter} zoom={14} booths={booths} />
        </div>

      </div>
    </div>
  )
}
