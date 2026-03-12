CREATE TABLE public.implementation_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  month_title text NOT NULL,
  month_order integer NOT NULL DEFAULT 0,
  week_title text,
  week_order integer NOT NULL DEFAULT 0,
  task_title text NOT NULL,
  task_order integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'not-started',
  tags text[] DEFAULT '{}',
  tag_colors text[] DEFAULT '{}',
  url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.implementation_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read implementation tasks"
  ON public.implementation_tasks
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Service role can manage implementation tasks"
  ON public.implementation_tasks
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);