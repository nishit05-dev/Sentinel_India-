# 🇮🇳 Sentinel India 2026

**Empowering the Indian Electorate through Technology.**

Sentinel India is a neutral, technology-driven ecosystem designed to simplify voter registration, candidate evaluation, and polling logistics for the 2026 Indian elections.

---

## 🚀 Vision
To provide a seamless, transparent, and accessible platform for every Indian citizen, ensuring they are informed and empowered to participate in the democratic process.

## ✨ Core Features

- **🗳️ Voter Journey Wizard:** A comprehensive, step-by-step guide to help first-time voters register for their Voter ID without errors.
- **📊 AI-Powered KYC Dashboard:** A deep-dive database into candidate backgrounds, criminal records, and AI-generated summaries of party manifestos.
- **📍 Smart Polling Hub:** Offline-accessible polling booth locator and digital voter slips, optimized for low-connectivity areas.
- **🤖 Jargon Buster:** An AI chatbot that explains complex electoral terms and procedures in multiple regional Indian languages.

## 🛠️ Tech Stack

- **Frontend:** [Next.js 15](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL + OTP/Phone Auth)
- **AI Engine:** [Gemini 1.5 Flash](https://deepmind.google/technologies/gemini/) + [Groq](https://groq.com/)
- **Maps:** [Leaflet.js](https://leafletjs.com/) + [OpenStreetMap](https://www.openstreetmap.org/)
- **Deployment:** [Vercel](https://vercel.com/)

## 🏗️ Technical Highlights

- **PWA Ready:** Designed for offline access to critical polling information.
- **SSR Optimized:** Fast loading times prioritized for rural networks.
- **Zero-Cost Infrastructure:** Built using robust free-tier tools for scalability.
- **Multi-lingual Support:** Leveraging Gemini for high-quality NLP in regional languages.

## 🏁 Getting Started

### Prerequisites
- Node.js 18+
- Supabase Account
- Google AI (Gemini) API Key
- Groq API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nishit05-dev/Sentinel_India-.git
   cd Sentinel_India-
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   GROQ_API_KEY=your_groq_api_key
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## 📂 Project Structure

```text
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/     # Reusable UI components
│   ├── utils/          # Helper functions & API clients
│   └── types/          # TypeScript definitions
├── public/             # Static assets
├── supabase/           # Database migrations and configurations
└── README.md           # You are here!
```

---

## 🤝 Contributing
We welcome contributions! Please feel free to submit a Pull Request or open an issue.

## 📄 License
This project is licensed under the MIT License.

---
*Built with ❤️ for a stronger Democracy.*
