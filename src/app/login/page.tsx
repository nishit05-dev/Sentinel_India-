import { login, signup } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>
}) {
  const resolvedSearchParams = await searchParams;
  
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 min-h-screen mx-auto">
      <form className="flex-1 flex flex-col w-full justify-center gap-4 text-white">
        <h1 className="text-3xl font-bold font-heading mb-4 text-center">Voter Login</h1>
        
        <label className="text-md font-bold text-sky-blue" htmlFor="email">
          Email / Phone (Placeholder)
        </label>
        <input
          className="rounded-md px-4 py-2 bg-white/5 border border-white/10 mb-6 text-white outline-none focus:ring-2 focus:ring-sentinel-green"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md font-bold text-sky-blue" htmlFor="password">
          Password / OTP
        </label>
        <input
          className="rounded-md px-4 py-2 bg-white/5 border border-white/10 mb-6 text-white outline-none focus:ring-2 focus:ring-sentinel-green"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button formAction={login} className="btn-primary mb-2">
          Sign In
        </button>
        <button formAction={signup} className="btn-secondary">
          Register for Voter ID
        </button>
        
        {resolvedSearchParams?.message && (
          <p className="mt-4 p-4 bg-white/5 text-warning text-center rounded-md border border-warning/20">
            {resolvedSearchParams.message}
          </p>
        )}
      </form>
    </div>
  )
}
