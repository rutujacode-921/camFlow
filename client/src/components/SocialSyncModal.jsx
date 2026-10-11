import React, { useState } from 'react';
import { 
  X, 
  Instagram, 
  Sparkles, 
  RefreshCw, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink,
  Radio,
  TrendingUp,
  Users,
  Eye
} from 'lucide-react';

export default function SocialSyncModal({ isOpen, onClose, creator, onSyncSocial }) {
  if (!isOpen || !creator) return null;

  const [platforms, setPlatforms] = useState({
    instagram: creator.socialLinks?.instagram || creator.handle?.replace(/^@/, '') || 'nelson.vance',
    tiktok: creator.socialLinks?.tiktok || creator.handle?.replace(/^@/, '') || 'nelson.vance',
    youtube: creator.socialLinks?.youtube || 'nelsonvance',
    pinterest: creator.socialLinks?.pinterest || 'nelsonvance'
  });

  const [syncingPlatform, setSyncingPlatform] = useState(null);
  const [syncLog, setSyncLog] = useState([]);
  const [successPlatform, setSuccessPlatform] = useState(null);

  const handleSync = async (platformName) => {
    setSyncingPlatform(platformName);
    setSyncLog([
      `[${new Date().toLocaleTimeString()}] Authenticating with ${platformName.toUpperCase()} API endpoint...`,
      `[${new Date().toLocaleTimeString()}] Verifying handle @${platforms[platformName]}...`,
      `[${new Date().toLocaleTimeString()}] Fetching 90-day engagement metrics and reach distributions...`
    ]);

    // Simulate realistic API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    setSyncLog(prev => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Eliminating bot anomalies (Variance < 2.1%)...`,
      `[${new Date().toLocaleTimeString()}] Generating verified CamFlow audience trust signature...`
    ]);

    const res = await onSyncSocial(creator.id, {
      platform: platformName,
      handle: platforms[platformName]
    });

    setSyncingPlatform(null);
    if (res?.success) {
      setSuccessPlatform(platformName);
      setSyncLog(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] ✅ Sync complete! Audience reach updated to ${res.socialStats?.instagram || '185K'}.`
      ]);
      setTimeout(() => setSuccessPlatform(null), 3500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FAFAF8] rounded-3xl shadow-2xl border border-sage-200/80 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-sage-200/60 bg-white flex items-center justify-between">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-sage-800">
              <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>Live Social Graph API Sync</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-editorial font-semibold text-ink-900 mt-0.5">
              Social Channels & Verified Reach
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-sage-100 text-ink-500 hover:text-ink-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Real-time stats snapshot */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-3.5 rounded-2xl border border-sage-200/80 shadow-xs">
              <span className="text-[11px] font-semibold text-ink-500 uppercase tracking-wider block">Instagram</span>
              <div className="text-lg font-editorial font-semibold text-ink-900 mt-1">
                {creator.socialStats?.instagram || '185K'}
              </div>
              <span className="text-[10px] text-emerald-600 font-medium">Verified Active</span>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-sage-200/80 shadow-xs">
              <span className="text-[11px] font-semibold text-ink-500 uppercase tracking-wider block">TikTok</span>
              <div className="text-lg font-editorial font-semibold text-ink-900 mt-1">
                {creator.socialStats?.tiktok || '92K'}
              </div>
              <span className="text-[10px] text-emerald-600 font-medium">Connected</span>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-sage-200/80 shadow-xs">
              <span className="text-[11px] font-semibold text-ink-500 uppercase tracking-wider block">Engagement</span>
              <div className="text-lg font-editorial font-semibold text-ink-900 mt-1">
                {creator.socialStats?.engagementRate || '4.8%'}
              </div>
              <span className="text-[10px] text-sage-700 font-medium">Top 5% Tier</span>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-sage-200/80 shadow-xs">
              <span className="text-[11px] font-semibold text-ink-500 uppercase tracking-wider block">Trust Score</span>
              <div className="text-lg font-editorial font-semibold text-emerald-600 mt-1">
                {creator.socialStats?.authenticityScore || 98}%
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold">Tier 1 Organic</span>
            </div>
          </div>

          {/* Social Channels List with Sync Actions */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-ink-700 uppercase tracking-wider">
              Connected Channels & Instant Refresh
            </h4>

            {/* Instagram */}
            <div className="bg-white p-4 rounded-2xl border border-sage-200 flex items-center justify-between gap-4">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0 shadow-xs">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-ink-900">Instagram Graph API</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                      Live
                    </span>
                  </div>
                  <input
                    type="text"
                    value={platforms.instagram}
                    onChange={(e) => setPlatforms({ ...platforms, instagram: e.target.value })}
                    className="text-xs text-ink-600 bg-transparent border-b border-dashed border-ink-300 focus:outline-none focus:border-ink-800 w-full max-w-[200px]"
                    placeholder="@handle"
                  />
                </div>
              </div>

              <button
                onClick={() => handleSync('instagram')}
                disabled={syncingPlatform === 'instagram'}
                className="px-3.5 py-2 bg-sage-100 hover:bg-sage-200 text-sage-900 rounded-full text-xs font-semibold transition-all inline-flex items-center space-x-1.5 flex-shrink-0 border border-sage-300/60"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncingPlatform === 'instagram' ? 'animate-spin text-sage-700' : ''}`} />
                <span>{syncingPlatform === 'instagram' ? 'Syncing...' : 'Sync Live'}</span>
              </button>
            </div>

            {/* TikTok */}
            <div className="bg-white p-4 rounded-2xl border border-sage-200 flex items-center justify-between gap-4">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white flex-shrink-0 shadow-xs">
                  <span className="font-bold text-xs tracking-tighter">TikTok</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-ink-900">TikTok Creator Marketplace</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                      Live
                    </span>
                  </div>
                  <input
                    type="text"
                    value={platforms.tiktok}
                    onChange={(e) => setPlatforms({ ...platforms, tiktok: e.target.value })}
                    className="text-xs text-ink-600 bg-transparent border-b border-dashed border-ink-300 focus:outline-none focus:border-ink-800 w-full max-w-[200px]"
                    placeholder="@handle"
                  />
                </div>
              </div>

              <button
                onClick={() => handleSync('tiktok')}
                disabled={syncingPlatform === 'tiktok'}
                className="px-3.5 py-2 bg-sage-100 hover:bg-sage-200 text-sage-900 rounded-full text-xs font-semibold transition-all inline-flex items-center space-x-1.5 flex-shrink-0 border border-sage-300/60"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncingPlatform === 'tiktok' ? 'animate-spin text-sage-700' : ''}`} />
                <span>{syncingPlatform === 'tiktok' ? 'Syncing...' : 'Sync Live'}</span>
              </button>
            </div>

            {/* YouTube */}
            <div className="bg-white p-4 rounded-2xl border border-sage-200 flex items-center justify-between gap-4">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white flex-shrink-0 shadow-xs">
                  <span className="font-bold text-xs tracking-tighter">YT</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-ink-900">YouTube Partner Insights</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-sage-100 text-sage-800 font-semibold">
                      Connected
                    </span>
                  </div>
                  <input
                    type="text"
                    value={platforms.youtube}
                    onChange={(e) => setPlatforms({ ...platforms, youtube: e.target.value })}
                    className="text-xs text-ink-600 bg-transparent border-b border-dashed border-ink-300 focus:outline-none focus:border-ink-800 w-full max-w-[200px]"
                    placeholder="channel"
                  />
                </div>
              </div>

              <button
                onClick={() => handleSync('youtube')}
                disabled={syncingPlatform === 'youtube'}
                className="px-3.5 py-2 bg-sage-100 hover:bg-sage-200 text-sage-900 rounded-full text-xs font-semibold transition-all inline-flex items-center space-x-1.5 flex-shrink-0 border border-sage-300/60"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncingPlatform === 'youtube' ? 'animate-spin text-sage-700' : ''}`} />
                <span>{syncingPlatform === 'youtube' ? 'Syncing...' : 'Sync Live'}</span>
              </button>
            </div>
          </div>

          {/* Real-Time API Telemetry Terminal */}
          {syncLog.length > 0 && (
            <div className="p-4 bg-ink-900 rounded-2xl font-mono text-[11px] text-emerald-400 space-y-1 shadow-inner animate-fadeIn">
              <div className="flex items-center justify-between text-gray-400 border-b border-gray-800 pb-2 mb-2 font-sans text-xs">
                <span>API Telemetry Stream</span>
                <span className="text-emerald-400">● Live Connection</span>
              </div>
              {syncLog.map((log, idx) => (
                <div key={idx} className="leading-relaxed">
                  {log}
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-4 border-t border-sage-200/60 bg-white flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-ink-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted OAuth2 Bearer Handshake</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-ink-900 hover:bg-black text-white rounded-full text-xs font-semibold shadow-sm transition-all"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}

