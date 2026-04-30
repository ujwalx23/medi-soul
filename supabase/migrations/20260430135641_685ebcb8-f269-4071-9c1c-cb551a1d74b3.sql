CREATE TABLE public.image_analysis_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  mode TEXT NOT NULL DEFAULT 'general',
  image_preview TEXT,
  analysis TEXT NOT NULL,
  language TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.image_analysis_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own image analysis"
ON public.image_analysis_history FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own image analysis"
ON public.image_analysis_history FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own image analysis"
ON public.image_analysis_history FOR DELETE
USING (auth.uid() = user_id);

CREATE INDEX idx_image_analysis_user_created ON public.image_analysis_history(user_id, created_at DESC);