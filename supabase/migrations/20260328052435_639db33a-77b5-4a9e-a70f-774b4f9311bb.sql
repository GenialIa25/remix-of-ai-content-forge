CREATE POLICY "Anon can view active modules"
ON public.lesson_modules
FOR SELECT
TO anon
USING (is_active = true);

CREATE POLICY "Anon can view active lessons"
ON public.lessons
FOR SELECT
TO anon
USING (is_active = true);