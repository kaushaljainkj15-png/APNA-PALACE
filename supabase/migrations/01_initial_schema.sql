-- Create custom types
CREATE TYPE proficiency_level AS ENUM ('beginner', 'intermediate', 'advanced', 'native');
CREATE TYPE language_relation_type AS ENUM ('speaking', 'learning');

-- PROFILES
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  country TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT username_length CHECK (char_length(username) >= 3 AND char_length(username) <= 30)
);

-- LANGUAGES DIRECTORY (Static lookup table)
CREATE TABLE public.languages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL, -- e.g., 'en', 'es'
  name TEXT UNIQUE NOT NULL -- e.g., 'English', 'Spanish'
);

-- USER LANGUAGES (Mapping users to languages they speak/learn)
CREATE TABLE public.user_languages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  language_id UUID REFERENCES public.languages(id) ON DELETE CASCADE,
  relation_type language_relation_type NOT NULL,
  proficiency proficiency_level NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, language_id, relation_type)
);

-- INTERESTS DIRECTORY
CREATE TABLE public.interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL
);

-- USER INTERESTS
CREATE TABLE public.user_interests (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  interest_id UUID REFERENCES public.interests(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, interest_id)
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_interests ENABLE ROW LEVEL SECURITY;

-- Profiles: Anyone can read, users can only update their own
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Languages: Read-only for everyone (managed by admins)
CREATE POLICY "Languages are viewable by everyone" ON public.languages FOR SELECT USING (true);

-- User Languages: Anyone can read, users manage their own
CREATE POLICY "User languages are viewable by everyone" ON public.user_languages FOR SELECT USING (true);
CREATE POLICY "Users can manage their own languages" ON public.user_languages FOR ALL USING (auth.uid() = user_id);

-- Interests: Read-only for everyone
CREATE POLICY "Interests are viewable by everyone" ON public.interests FOR SELECT USING (true);

-- User Interests: Anyone can read, users manage their own
CREATE POLICY "User interests are viewable by everyone" ON public.user_interests FOR SELECT USING (true);
CREATE POLICY "Users can manage their own interests" ON public.user_interests FOR ALL USING (auth.uid() = user_id);

-- Function to handle new user signup automatically (Trigger)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (new.id, split_part(new.email, '@', 1) || '_' || substr(md5(random()::text), 1, 6), split_part(new.email, '@', 1));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
