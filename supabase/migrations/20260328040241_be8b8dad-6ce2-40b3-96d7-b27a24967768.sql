
-- Allow authenticated users to insert, update, delete lesson_modules
CREATE POLICY "Authenticated can insert modules"
ON public.lesson_modules FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated can update modules"
ON public.lesson_modules FOR UPDATE TO authenticated
USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated can delete modules"
ON public.lesson_modules FOR DELETE TO authenticated
USING (true);

-- Allow authenticated users to insert, update, delete lessons
CREATE POLICY "Authenticated can insert lessons"
ON public.lessons FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated can update lessons"
ON public.lessons FOR UPDATE TO authenticated
USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated can delete lessons"
ON public.lessons FOR DELETE TO authenticated
USING (true);
