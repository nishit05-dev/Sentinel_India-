'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { saveProgress, loadProgress } from './actions'

export default function WizardPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProgress().then((res) => {
      setStep(res.step || 1)
      setLoading(false)
    })
  }, [])

  const nextStep = async () => {
    const next = Math.min(step + 1, 4)
    setStep(next)
    await saveProgress(next, {})
  }
  
  const prevStep = async () => {
    const prev = Math.max(step - 1, 1)
    setStep(prev)
    await saveProgress(prev, {})
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>
  }

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto flex flex-col justify-center">
      <Link href="/" className="text-sky-blue hover:underline mb-8 inline-block">&larr; Back to Home</Link>
      
      <div className="card w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading text-white mb-2">Voter Registration Wizard</h1>
          <p className="text-gray-400">Step {step} of 4</p>
          
          <div className="w-full bg-white/10 rounded-full h-2.5 mt-4">
            <div className="bg-sentinel-green h-2.5 rounded-full transition-all duration-300" style={{ width: `${(step / 4) * 100}%` }}></div>
          </div>
        </div>

        <div className="min-h-[300px]">
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-2xl font-bold text-sky-blue">Eligibility Check</h2>
              <p className="text-gray-300">To register as a voter in India, you must meet the following criteria:</p>
              <ul className="list-disc pl-5 space-y-2 text-white">
                <li>You are an Indian citizen.</li>
                <li>You have attained the age of 18 years on the qualifying date (usually 1st January of the year of revision of electoral roll).</li>
                <li>You are ordinarily resident of the polling area of the constituency where you want to be enrolled.</li>
                <li>You are not disqualified to be enrolled as an elector.</li>
              </ul>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-2xl font-bold text-sky-blue">Required Documents</h2>
              <p className="text-gray-300">Keep scanned copies or photos of the following documents ready (Max 2MB each, JPG/PNG/PDF):</p>
              <ul className="list-disc pl-5 space-y-2 text-white">
                <li><span className="font-bold text-sentinel-green">Passport size photograph</span> (White background preferred)</li>
                <li><span className="font-bold text-sentinel-green">Proof of Age</span> (Birth Certificate, PAN Card, Aadhaar Card, Driving License, or 10th Class Certificate)</li>
                <li><span className="font-bold text-sentinel-green">Proof of Residence</span> (Water/Electricity/Gas Bill, Aadhaar Card, Passbook, or Indian Passport)</li>
              </ul>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-2xl font-bold text-sky-blue">Form 6 Application</h2>
              <p className="text-gray-300">To register for a new Voter ID, you need to fill out <strong>Form 6</strong>.</p>
              <p className="text-white">You can do this online via the official Election Commission of India Voter Portal.</p>
              <div className="p-4 bg-warning/10 border border-warning/20 rounded-md mt-4">
                <p className="text-warning text-sm font-bold">Important Tip</p>
                <p className="text-gray-300 text-sm">Ensure your name exactly matches your supporting documents to avoid rejection.</p>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-2xl font-bold text-sky-blue">Submission & Tracking</h2>
              <p className="text-gray-300">Once you submit Form 6 on the official portal, you will receive a <strong>Reference Number</strong> via SMS/Email.</p>
              <p className="text-white">You can use this reference number to track the status of your application. The verification process usually takes a few weeks, which may include a visit from the Booth Level Officer (BLO).</p>
              
              <div className="mt-8">
                <a href="https://voters.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="btn-primary inline-block">
                  Go to Official ECI Portal
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-8 pt-4 border-t border-white/10">
          <button 
            onClick={prevStep} 
            disabled={step === 1}
            className={`btn-secondary ${step === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Previous
          </button>
          
          {step < 4 ? (
            <button onClick={nextStep} className="btn-primary">
              Next Step
            </button>
          ) : (
            <Link href="/" className="btn-secondary border-sentinel-green text-sentinel-green hover:bg-sentinel-green/10">
              Finish
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
