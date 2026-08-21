import { useAuth } from '../contexts/AuthContext';
import { Users, Video, Mic, Search } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="flex-1 flex flex-col p-6 max-w-7xl mx-auto w-full">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.email?.split('@')[0] || 'User'}</h1>
        <p className="text-gray-400">Ready to start talking to the world?</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Quick Actions */}
        <div className="glass-card p-6 rounded-xl hover:border-brand-red/50 transition-colors cursor-pointer group">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-brand-red/20 rounded-lg group-hover:bg-brand-red transition-colors">
              <Search className="w-6 h-6 text-brand-red group-hover:text-white" />
            </div>
            <h3 className="text-xl font-semibold">Find Partner</h3>
          </div>
          <p className="text-sm text-gray-400">Match with someone based on your language preferences.</p>
        </div>

        <div className="glass-card p-6 rounded-xl hover:border-brand-red/50 transition-colors cursor-pointer group">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-brand-red/20 rounded-lg group-hover:bg-brand-red transition-colors">
              <Users className="w-6 h-6 text-brand-red group-hover:text-white" />
            </div>
            <h3 className="text-xl font-semibold">Public Rooms</h3>
          </div>
          <p className="text-sm text-gray-400">Join open voice and text rooms with multiple participants.</p>
        </div>

        <div className="glass-card p-6 rounded-xl hover:border-brand-red/50 transition-colors cursor-pointer group">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-brand-red/20 rounded-lg group-hover:bg-brand-red transition-colors">
              <Video className="w-6 h-6 text-brand-red group-hover:text-white" />
            </div>
            <h3 className="text-xl font-semibold">Create Room</h3>
          </div>
          <p className="text-sm text-gray-400">Start a private WebRTC space and invite your friends.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Active Conversations Panel */}
        <div className="lg:col-span-2 glass-card rounded-xl p-6 flex flex-col">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Mic className="w-5 h-5 text-brand-red" /> Active Conversations
          </h3>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-white/10 rounded-lg">
            <div className="text-center text-gray-500">
              <p>No active conversations.</p>
              <p className="text-sm">Join a room or find a partner to start.</p>
            </div>
          </div>
        </div>

        {/* Online Status / Friends */}
        <div className="glass-card rounded-xl p-6 flex flex-col">
          <h3 className="text-lg font-semibold mb-4 border-b border-white/10 pb-2">Online Friends</h3>
          <div className="flex-1 flex flex-col gap-4 mt-2">
             <div className="text-center text-gray-500 text-sm italic mt-10">
              Profiles module coming in Phase 2.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
