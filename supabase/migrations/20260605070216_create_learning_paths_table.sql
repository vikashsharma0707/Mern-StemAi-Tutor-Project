CREATE TABLE learning_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  current_level TEXT DEFAULT 'beginner',
  weekly_plan JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own_paths" ON learning_paths FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "insert_own_paths" ON learning_paths FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own_paths" ON learning_paths FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own_paths" ON learning_paths FOR DELETE
  TO authenticated USING (auth.uid() = user_id);
