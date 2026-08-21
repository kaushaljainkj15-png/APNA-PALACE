import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Globe, User, MessageSquare } from 'lucide-react';

export default function MainLayout() {
  const { user, signOut } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 glass">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white tracking-widest uppercase">
            <Globe className="h-6 w-6 text-brand-red" />
            <span className="hidden sm:inline">Connect</span>
          </Link>

          <nav className="flex items-center gap-4 text-sm font-medium">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                  <span className="hidden sm:inline">Dashboard</span>
                  <MessageSquare className="h-5 w-5 sm:hidden" />
                </Link>
                <Link to="/profile" className="text-gray-300 hover:text-white transition-colors">
                  <span className="hidden sm:inline">Profile</span>
                  <User className="h-5 w-5 sm:hidden" />
                </Link>
                <button
                  onClick={signOut}
                  className="ml-4 flex items-center gap-2 rounded bg-brand-red/20 px-3 py-1.5 text-brand-red hover:bg-brand-red hover:text-white transition-all"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="rounded bg-brand-red px-4 py-2 text-white hover:bg-brand-red-light transition-colors shadow-[0_0_15px_rgba(139,0,0,0.5)]"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
