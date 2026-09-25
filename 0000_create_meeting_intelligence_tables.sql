CREATE TABLE public.meetings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL CHECK (char_length(title) BETWEEN 1 AND 180),
  meeting_date timestamptz NOT NULL DEFAULT now(),
  transcript text NOT NULL CHECK (char_length(transcript) BETWEEN 1 AND 50000),
  summary text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.meetings TO authenticated;
GRANT ALL ON public.meetings TO service_role;
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage their own meetings" ON public.meetings FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.meeting_outcomes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id uuid NOT NULL REFERENCES public.meetings(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  kind text NOT NULL CHECK (kind IN ('decision', 'action', 'unresolved')),
  content text NOT NULL CHECK (char_length(content) BETWEEN 1 AND 1000),
  owner text,
  deadline text,
  evidence_quote text NOT NULL CHECK (char_length(evidence_quote) BETWEEN 1 AND 1200),
  evidence_locator text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'done')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.meeting_outcomes TO authenticated;
GRANT ALL ON public.meeting_outcomes TO service_role;
ALTER TABLE public.meeting_outcomes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage their own outcomes" ON public.meeting_outcomes FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX meeting_outcomes_meeting_id_idx ON public.meeting_outcomes(meeting_id);
CREATE INDEX meeting_outcomes_user_id_idx ON public.meeting_outcomes(user_id);