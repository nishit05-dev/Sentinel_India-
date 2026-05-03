import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center space-y-12">
      <header className="space-y-4 max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white font-heading">
          Sentinel India <span className="text-sentinel-green">2026</span>
        </h1>
        <p className="text-xl text-sky-blue max-w-2xl mx-auto">
          Empowering the Indian electorate with a neutral, technology-driven ecosystem that simplifies voter registration, candidate evaluation, and polling logistics.
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {/* Voter Wizard Card */}
        <div className="card flex flex-col items-start text-left space-y-4">
          <div className="w-12 h-12 rounded-full bg-sky-blue/20 flex items-center justify-center text-sky-blue mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Voter Wizard</h2>
          <p className="text-gray-400 flex-grow">Step-by-step registration guide for first-time voters to ensure zero mistakes.</p>
          <Link href="/wizard" className="btn-secondary w-full mt-4 text-center block">Start Registration</Link>
        </div>

        {/* KYC Dashboard Card */}
        <div className="card flex flex-col items-start text-left space-y-4">
          <div className="w-12 h-12 rounded-full bg-sentinel-green/20 flex items-center justify-center text-sentinel-green mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">KYC Dashboard</h2>
          <p className="text-gray-400 flex-grow">AI-powered candidate backgrounds and manifesto summaries.</p>
          <Link href="/kyc" className="btn-secondary w-full mt-4 text-center block">Compare Candidates</Link>
        </div>

        {/* Smart Polling Hub Card */}
        <div className="card flex flex-col items-start text-left space-y-4">
          <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center text-warning mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Smart Polling Hub</h2>
          <p className="text-gray-400 flex-grow">Offline-accessible booth locator and digital voter slips.</p>
          <Link href="/polling-hub" className="btn-secondary w-full mt-4 text-center block">Find My Booth</Link>
        </div>

        {/* Jargon Buster Card */}
        <div className="card flex flex-col items-start text-left space-y-4">
          <div className="w-12 h-12 rounded-full bg-error/20 flex items-center justify-center text-error mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Jargon Buster</h2>
          <p className="text-gray-400 flex-grow">AI chatbot explaining electoral terms in your regional language.</p>
          <Link href="/jargon-buster" className="btn-secondary w-full mt-4 text-center block">Ask AI</Link>
        </div>
      </main>

      <div className="pt-8">
        <Link href="/polling-hub" className="btn-primary text-lg px-8 py-4 shadow-lg shadow-sentinel-green/20 inline-block">
          Launch Polling Hub
        </Link>
      </div>
    </div>
  );
}
