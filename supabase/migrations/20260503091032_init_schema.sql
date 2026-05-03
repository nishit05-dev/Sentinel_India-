-- Create profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  voter_id_number TEXT UNIQUE,
  phone_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- Create candidates table
CREATE TABLE public.candidates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  party_name TEXT NOT NULL,
  constituency TEXT NOT NULL,
  criminal_records_summary TEXT,
  education_summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view candidates" ON public.candidates FOR SELECT USING (true);

-- Create manifestos table
CREATE TABLE public.manifestos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  party_name TEXT NOT NULL,
  ai_summary TEXT NOT NULL,
  full_text_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.manifestos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view manifestos" ON public.manifestos FOR SELECT USING (true);

-- Create polling_booths table
CREATE TABLE public.polling_booths (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  constituency TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.polling_booths ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view polling booths" ON public.polling_booths FOR SELECT USING (true);
