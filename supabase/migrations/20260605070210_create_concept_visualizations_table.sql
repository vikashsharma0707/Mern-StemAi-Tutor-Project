CREATE TABLE concept_visualizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic TEXT NOT NULL,
  subject TEXT DEFAULT 'General',
  explanation TEXT NOT NULL,
  mermaid_code TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE concept_visualizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own_visualizations" ON concept_visualizations FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "insert_own_visualizations" ON concept_visualizations FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own_visualizations" ON concept_visualizations FOR DELETE
  TO authenticated USING (auth.uid() = user_id);
