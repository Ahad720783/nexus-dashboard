import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, Columns, Star, ArrowRight } from 'lucide-react';
import { MetaEquivLogo } from '../assets/MetaEquivLogo';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

export const SignIn = () => {
  const navigate = useNavigate();
  const { login, loginGuest } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await login(email.trim(), password || 'password123');
      navigate('/dashboard');
    } catch (err) {
      console.error('Sign in error:', err);
    }
  };

  const handleGuest = async () => {
    try {
      await loginGuest();
      navigate('/dashboard');
    } catch (err) {
      console.error('Guest session error:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white text-slate-900 select-none">
      {/* LEFT COLUMN: Dark Navy Branding Panel (Screen 01) */}
      <div className="md:w-1/2 lg:w-7/12 bg-[#121927] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        {/* Subtle geometric network background highlight */}
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Logo */}
        <div className="relative z-10">
          <MetaEquivLogo light />
        </div>

        {/* Central Proposition */}
        <div className="my-auto py-12 max-w-lg relative z-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight mb-5">
            Is your new metaheuristic actually new?
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed mb-8">
            MetaEquiv reads the update equations of an iterative, nature-inspired optimiser,
            converts them to a canonical symbolic form, and checks them against a reference
            library of published algorithms.
          </p>

          <div className="space-y-3.5">
            <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
              <div className="p-1 rounded bg-blue-500/20 text-blue-400 shrink-0 mt-0.5">
                <Code2 className="w-4 h-4" />
              </div>
              <span>Symbolic parsing of position and velocity update rules</span>
            </div>

            <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
              <div className="p-1 rounded bg-blue-500/20 text-blue-400 shrink-0 mt-0.5">
                <Columns className="w-4 h-4" />
              </div>
              <span>Side-by-side structural and operator comparison</span>
            </div>

            <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
              <div className="p-1 rounded bg-blue-500/20 text-blue-400 shrink-0 mt-0.5">
                <Star className="w-4 h-4" />
              </div>
              <span>Novelty verdict with the reasoning that produced it</span>
            </div>
          </div>
        </div>

        {/* Footer Attribution */}
        <div className="relative z-10 pt-6 border-t border-[#1e293b] text-xs text-slate-400">
          Engineering Capstone Project · AI for Computational Intelligence
        </div>
      </div>

      {/* RIGHT COLUMN: Sign In Form (Screen 01) */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 bg-white">
        <div className="w-full max-w-sm space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Sign in
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Use your institutional account to continue.
            </p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Institutional email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@university.edu"
                className="w-full px-3.5 py-2 text-xs sm:text-sm text-slate-800 bg-white border border-slate-300 rounded-md placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors shadow-2xs"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Demo password reset instructions sent to university email.')}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 text-xs sm:text-sm text-slate-800 bg-white border border-slate-300 rounded-md placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors shadow-2xs"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full font-semibold"
            >
              Sign in
            </Button>
          </form>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-xs text-slate-400 absolute">or</span>
          </div>

          <div className="space-y-2.5">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleGuest}
              className="w-full text-slate-700 font-medium"
            >
              Continue as guest reviewer
            </Button>
            <p className="text-[11px] text-slate-400 leading-normal text-center">
              Guest sessions can run comparisons against the reference library but cannot save analyses to history.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
