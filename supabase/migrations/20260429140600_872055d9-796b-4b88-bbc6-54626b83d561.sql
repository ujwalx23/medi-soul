CREATE TABLE public.family_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  father TEXT,
  mother TEXT,
  grandparents TEXT,
  siblings TEXT,
  other_relatives TEXT,
  analysis_result JSONB,
  overall_risk TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.family_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own family history"
ON public.family_history FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own family history"
ON public.family_history FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own family history"
ON public.family_history FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own family history"
ON public.family_history FOR DELETE
USING (auth.uid() = user_id);

CREATE TRIGGER update_family_history_updated_at
BEFORE UPDATE ON public.family_history
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();

CREATE INDEX idx_family_history_user_id ON public.family_history(user_id);