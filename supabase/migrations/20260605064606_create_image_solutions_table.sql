CREATE TABLE image_solutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  solution TEXT NOT NULL,
  subject TEXT DEFAULT 'General',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE image_solutions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own_image_solutions" ON image_solutions FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "insert_own_image_solutions" ON image_solutions FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own_image_solutions" ON image_solutions FOR DELETE
  TO authenticated USING (auth.uid() = user_id);
