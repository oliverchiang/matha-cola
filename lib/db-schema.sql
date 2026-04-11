CREATE TABLE profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  pin TEXT NOT NULL,
  bottle_caps INTEGER DEFAULT 0,
  avatar JSONB DEFAULT '{}',
  purchased_items JSONB DEFAULT '[]',
  total_games_played INTEGER DEFAULT 0,
  total_correct_answers INTEGER DEFAULT 0,
  high_scores JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE challenges (
  id TEXT PRIMARY KEY,
  config JSONB NOT NULL,
  questions JSONB NOT NULL,
  challenger_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  challenger_name TEXT NOT NULL,
  challengee_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  challengee_name TEXT NOT NULL,
  challenger_result JSONB NOT NULL,
  challengee_result JSONB,
  status TEXT DEFAULT 'pending',
  bonus_awarded BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_challenges_challengee ON challenges(challengee_id, status);
CREATE INDEX idx_challenges_challenger ON challenges(challenger_id);
