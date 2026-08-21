import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MessageSquare, Globe2, Shield } from 'lucide-react';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Abstract Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-red/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-darkred/40 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="z-10 max-w-4xl w-full text-center space-y-8 py-20">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
          Talk to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-red-500 text-glow">world.</span>
        </h1>

        <p className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto font-light">
          Meet people, practice languages, and have real conversations with peers globally via secure WebRTC.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          {user ? (
            <Link to="/dashboard" className="rounded-md bg-brand-red px-8 py-4 text-sm font-semibold tracking-widest uppercase text-white hover:bg-brand-red-light transition-all shadow-[0_0_20px_rgba(139,0,0,0.6)]">
              Enter Dashboard
            </Link>
          ) : (
            <>
              <Link to="/register" className="rounded-md bg-brand-red px-8 py-4 text-sm font-semibold tracking-widest uppercase text-white hover:bg-brand-red-light transition-all shadow-[0_0_20px_rgba(139,0,0,0.6)]">
                Start Talking
              </Link>
              <Link to="/rooms" className="rounded-md glass px-8 py-4 text-sm font-semibold tracking-widest uppercase text-white hover:bg-white/10 transition-all">
                Explore Rooms
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="z-10 w-full max-w-6xl mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">
        <div className="glass-card p-8 rounded-xl flex flex-col items-center text-center space-y-4">
          <div className="p-4 bg-brand-red/10 rounded-full text-brand-red">
            <Globe2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold">Global Discovery</h3>
          <p className="text-gray-400 text-sm">Find partners by language, proficiency, and interests from around the globe.</p>
        </div>
        <div className="glass-card p-8 rounded-xl flex flex-col items-center text-center space-y-4">
          <div className="p-4 bg-brand-red/10 rounded-full text-brand-red">
            <MessageSquare className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold">Real-Time Chat</h3>
          <p className="text-gray-400 text-sm">Lightning fast messaging and high-quality P2P audio and video calls.</p>
        </div>
        <div className="glass-card p-8 rounded-xl flex flex-col items-center text-center space-y-4">
          <div className="p-4 bg-brand-red/10 rounded-full text-brand-red">
            <Shield className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold">Secure by Design</h3>
          <p className="text-gray-400 text-sm">End-to-end encrypted WebRTC media and strict data access policies.</p>
        </div>
      </div>
    </div>
  );
}
