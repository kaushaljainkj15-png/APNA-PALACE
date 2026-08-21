import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import type { Profile } from '../types/database';
import { Loader2, Save, User as UserIcon, Languages, Heart } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);

  // Form state
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [country, setCountry] = useState('');

  // Language state (Mocked for UI purposes until seed data is added)
  const availableLanguages = [
    { id: '1', name: 'English' },
    { id: '2', name: 'Spanish' },
    { id: '3', name: 'French' },
    { id: '4', name: 'German' },
    { id: '5', name: 'Hindi' },
    { id: '6', name: 'Japanese' }
  ];

  const [spokenLang, setSpokenLang] = useState('');
  const [learningLang, setLearningLang] = useState('');
  const [interestsInput, setInterestsInput] = useState('');

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error loading profile', error);
      } else if (data) {
        setProfile(data as Profile);
        setDisplayName(data.display_name || '');
        setBio(data.bio || '');
        setCountry(data.country || '');
      }
      setLoading(false);
    }

    loadProfile();
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setMessage(null);

    const updates = {
      id: user.id,
      display_name: displayName,
      bio,
      country,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Profile updated successfully!' });

      // Note: Actual relational data saving (user_languages, user_interests)
      // will be wired up once the database is seeded with language/interest lists.
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-red" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-6 max-w-4xl mx-auto w-full">
      <header className="mb-8 flex items-center gap-4">
        <div className="p-4 bg-brand-red/20 rounded-full">
          <UserIcon className="w-8 h-8 text-brand-red" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <p className="text-gray-400">Manage your public persona</p>
        </div>
      </header>

      {message && (
        <div className={`p-4 rounded-lg mb-6 text-sm ${message.type === 'error' ? 'bg-red-500/10 text-red-500 border border-red-500/50' : 'bg-green-500/10 text-green-500 border border-green-500/50'}`}>
          {message.text}
        </div>
      )}

      <div className="glass-card p-6 rounded-xl mb-8">
        <h2 className="text-xl font-semibold mb-6 border-b border-white/10 pb-4">Basic Information</h2>
        <form id="profile-form" onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
              <input
                type="text"
                disabled
                value={profile?.username || ''}
                className="w-full bg-brand-black/30 border border-white/5 rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-brand-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                placeholder="What should people call you?"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full bg-brand-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
              placeholder="Where are you from?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full bg-brand-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all resize-none"
              placeholder="Tell others a bit about yourself..."
            />
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-6 border-b border-white/10 pb-4 flex items-center gap-2">
            <Languages className="w-5 h-5 text-brand-red" /> Languages
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Languages I Speak</label>
              <select
                className="w-full bg-brand-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red"
                value={spokenLang}
                onChange={(e) => setSpokenLang(e.target.value)}
              >
                <option value="" disabled>Select a language</option>
                {availableLanguages.map(l => (
                  <option key={`speak-${l.id}`} value={l.id}>{l.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Languages I'm Learning</label>
              <select
                className="w-full bg-brand-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red"
                value={learningLang}
                onChange={(e) => setLearningLang(e.target.value)}
              >
                <option value="" disabled>Select a language</option>
                {availableLanguages.map(l => (
                  <option key={`learn-${l.id}`} value={l.id}>{l.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-6 border-b border-white/10 pb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-brand-red" /> Interests
          </h2>

          <div className="space-y-4">
             <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Topics I like talking about</label>
              <input
                type="text"
                value={interestsInput}
                onChange={(e) => setInterestsInput(e.target.value)}
                className="w-full bg-brand-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                placeholder="e.g. Technology, Travel, Movies (Comma separated)"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pb-12">
        <button
          type="submit"
          form="profile-form"
          disabled={saving}
          className="bg-brand-red hover:bg-brand-red-light text-white font-semibold py-3 px-8 rounded-lg transition-all flex items-center gap-2 disabled:opacity-50 shadow-[0_0_15px_rgba(139,0,0,0.4)]"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

    </div>
  );
}
