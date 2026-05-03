CREATE TABLE public.wizard_progress (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  step INTEGER DEFAULT 1,
  data JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.wizard_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own wizard progress"
ON public.wizard_progress FOR ALL
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);
