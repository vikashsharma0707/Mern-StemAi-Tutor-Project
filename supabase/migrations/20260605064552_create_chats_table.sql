CREATE TABLE chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT DEFAULT 'General',
  messages JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE chats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own_chats" ON chats FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "insert_own_chats" ON chats FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own_chats" ON chats FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own_chats" ON chats FOR DELETE
  TO authenticated USING (auth.uid() = user_id);
