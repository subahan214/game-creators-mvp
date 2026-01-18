-- Game of Creators MVP - Database Schema
-- Created: January 18, 2026

-- Profiles table (Creator accounts)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tiktok_id TEXT UNIQUE,
  tiktok_token TEXT,
  linkedin_id TEXT UNIQUE,
  linkedin_token TEXT
);

-- Campaigns table (Contests)
CREATE TABLE campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('leaderboard', 'cpm')) NOT NULL,
  end_date TIMESTAMPTZ
);

-- Submissions table (Video/Post entries)
CREATE TABLE submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  platform TEXT CHECK (platform IN ('tiktok', 'linkedin')),
  video_url TEXT,
  video_id TEXT,
  views INTEGER DEFAULT 0,
  is_fraud BOOLEAN DEFAULT false,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sample campaign data
INSERT INTO campaigns (name, type, end_date) 
VALUES ('Test Contest', 'leaderboard', NOW() + INTERVAL '7 days');

-- Indexes for performance
CREATE INDEX idx_submissions_campaign ON submissions(campaign_id);
CREATE INDEX idx_submissions_views ON submissions(views DESC);
CREATE INDEX idx_submissions_user ON submissions(user_id);
