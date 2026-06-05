CREATE TABLE practices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  difficulty TEXT DEFAULT 'medium',
  questions JSONB DEFAULT '[]'::jsonb,
  score INT DEFAULT 0,
  total_questions INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE practices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own_practices" ON practices FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "insert_own_practices" ON practices FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own_practices" ON practices FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own_practices" ON practices FOR DELETE
  TO authenticated USING (auth.uid() = user_id);
