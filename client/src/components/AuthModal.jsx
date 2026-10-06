import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  X, 
  Sparkles, 
  Lock, 
  Mail, 
  User, 
  CheckCircle2, 
  ArrowRight,
  Camera,
  Briefcase,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onOpenCreatorOnboarding, onOpenBrandOnboarding }) {
  const { login, register, quickLoginAs } = useAuth();
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [role, setRole] = useState('creator'); // 'creator' | 'brand'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (tab === 'login') {
      const res = await login(email, password);
      setLoading(false);
      if (res.success) {
        onClose();
      } else {
        setError(res.error || 'Invalid credentials');
      }
    } else {
      if (!name) {
        setLoading(false);
        setError('Please enter your full name');
        return;
      }
      const res = await register(name, email, password, role);
      setLoading(false);
      if (res.success) {
        onClose();
        if (role === 'creator') {
          onOpenCreatorOnboarding();
        } else {
          onOpenBrandOnboarding();
        }
      } else {
        setError(res.error || 'Registration failed');
      }
    }
  };

  const handleQuickLogin = async (asRole) => {
    setLoading(true);
    setError('');
    const res = await quickLoginAs(asRole);
    setLoading(false);
    if (res.success) {
      onClose();
    } else {
      setError(res.error || 'Quick login failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full border border-sage-200 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-sage-200 flex items-center justify-between bg-[#F8FAF7]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-sage-800 text-white flex items-center justify-center font-editorial font-bold text-xl shadow-sm">
              C
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-sage-800">
                CamFlow Auth Core
              </span>
              <h3 className="text-xl font-editorial font-semibold text-ink-900">
                {tab === 'login' ? 'Welcome Back' : 'Create an Account'}
              </h3>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-sage-200 flex items-center justify-center text-ink-500 hover:text-ink-900 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Quick 1-Click Demo Login Shortcuts */}
          <div className="space-y-2 bg-[#F5F8F4] p-3.5 rounded-2xl border border-sage-200">
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-sage-900">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>1-Click Test Accounts:</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleQuickLogin('creator')}
                disabled={loading}
                className="bg-white hover:bg-sage-50 text-ink-900 border border-sage-300 text-xs font-semibold py-2 px-2.5 rounded-xl shadow-xs transition flex items-center justify-center space-x-1"
              >
                <Camera className="w-3.5 h-3.5 text-sage-700" />
                <span>Nelson (Creator)</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('brand')}
                disabled={loading}
                className="bg-white hover:bg-sage-50 text-ink-900 border border-sage-300 text-xs font-semibold py-2 px-2.5 rounded-xl shadow-xs transition flex items-center justify-center space-x-1"
              >
                <Briefcase className="w-3.5 h-3.5 text-sage-700" />
                <span>Aura (Brand)</span>
              </button>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-[#F5F8F4] p-1 rounded-xl border border-sage-200">
            <button
              type="button"
              onClick={() => { setTab('login'); setError(''); }}
              className={`flex-1 text-xs py-2 rounded-lg font-semibold transition ${tab === 'login' ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-600 hover:text-ink-900'}`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setTab('register'); setError(''); }}
              className={`flex-1 text-xs py-2 rounded-lg font-semibold transition ${tab === 'register' ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-600 hover:text-ink-900'}`}
            >
              New Registration
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {tab === 'register' && (
              <>
                {/* Role Selection Cards */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-ink-600 mb-1.5">
                    Select Your Role:
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div 
                      onClick={() => setRole('creator')}
                      className={`cursor-pointer p-3 rounded-2xl border text-center transition ${role === 'creator' ? 'bg-[#EBF3EA] border-sage-400 ring-2 ring-sage-300 shadow-sm' : 'bg-white border-sage-200 hover:bg-sage-50'}`}
                    >
                      <Camera className="w-5 h-5 mx-auto text-sage-800 mb-1" />
                      <div className="text-xs font-bold text-ink-900">Creator</div>
                      <div className="text-[10px] text-ink-500">Portfolio & Escrow</div>
                    </div>

                    <div 
                      onClick={() => setRole('brand')}
                      className={`cursor-pointer p-3 rounded-2xl border text-center transition ${role === 'brand' ? 'bg-[#EBF3EA] border-sage-400 ring-2 ring-sage-300 shadow-sm' : 'bg-white border-sage-200 hover:bg-sage-50'}`}
                    >
                      <Briefcase className="w-5 h-5 mx-auto text-sage-800 mb-1" />
                      <div className="text-xs font-bold text-ink-900">Brand / Agency</div>
                      <div className="text-[10px] text-ink-500">Briefs & AI Match</div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-ink-600 mb-1">
                    Full Name / Brand Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={role === 'creator' ? 'e.g. Rutuja K' : 'e.g. Lumina Botanicals'}
                      className="w-full bg-[#FAFBF9] border border-sage-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-sage-300 font-medium"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-ink-600 mb-1">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-[#FAFBF9] border border-sage-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-sage-300 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-ink-600 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#FAFBF9] border border-sage-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-sage-300 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sage-800 hover:bg-sage-900 text-white font-semibold text-xs py-3 rounded-xl shadow-md transition flex items-center justify-center space-x-1.5 disabled:opacity-50"
            >
              <span>{loading ? 'Processing...' : (tab === 'login' ? 'Sign In to CamFlow' : 'Create Account & Continue')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
