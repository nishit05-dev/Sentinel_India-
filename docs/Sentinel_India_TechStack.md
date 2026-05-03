# Sentinel India 2026: Technical Architecture

## 1. Stack Overview
* **Frontend:** Next.js 15 (hosted on Vercel)
* **Styling:** Tailwind CSS
* **Database:** Supabase (PostgreSQL)
* **Authentication:** Supabase Auth (OTP/Phone)
* **AI Engine:** Gemini 1.5 Flash + Groq
* **Maps:** Leaflet.js + OpenStreetMap

## 2. Implementation Justification
* **PWA:** Required for offline access to polling data.
* **SSR:** Ensures fast loading on slow rural networks.
* **Zero-Cost:** All chosen tools provide robust free tiers.
* **NLP:** Gemini provides high-quality Indian language support.
