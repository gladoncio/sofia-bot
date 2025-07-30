CREATE TABLE IF NOT EXISTS guild_settings (
  guild_id BIGINT PRIMARY KEY,
  guild_name TEXT NOT NULL,
  welcome_enabled BOOLEAN DEFAULT FALSE,
  gift_enabled BOOLEAN DEFAULT FALSE,
  welcome_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
