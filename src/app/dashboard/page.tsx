'use client';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-12 text-center">
          🎮 Creator Dashboard
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* TikTok OAuth - WORKING */}
          <a href="/api/auth/tiktok" className="bg-gradient-to-r from-red-400 to-pink-500 text-white p-10 rounded-3xl text-center font-bold text-xl hover:scale-105 shadow-2xl border-4 border-transparent hover:border-green-400 transition-all group">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">🎵</div>
            <div>Connect TikTok Account</div>
            <div className="text-sm text-red-200 mt-2">OAuth 2.0 Ready</div>
          </a>

          {/* LinkedIn OAuth - WORKING */}
          <a href="/api/auth/linkedin" className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-10 rounded-3xl text-center font-bold text-xl hover:scale-105 shadow-2xl border-4 border-transparent hover:border-blue-400 transition-all group">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">💼</div>
            <div>Connect LinkedIn Account</div>
            <div className="text-sm text-blue-200 mt-2">Profile Sync Ready</div>
          </a>
        </div>

        <div className="text-center">
          <a href="/submit" className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-12 py-6 rounded-3xl text-2xl font-black hover:scale-105 shadow-2xl inline-block">
            📱 Submit Video Now →
          </a>
        </div>
      </div>
    </div>
  );
}
