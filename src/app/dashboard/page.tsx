export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-black bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-16 text-center">
          🎮 Game of Creators
        </h1>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* TikTok Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 hover:border-white/40 transition-all hover:scale-[1.02]">
            <div className="text-5xl mb-6">📱</div>
            <h2 className="text-3xl font-bold text-white mb-6">TikTok Integration</h2>
            <a href="/api/auth/tiktok" className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-12 py-6 rounded-2xl text-xl font-bold block text-center shadow-2xl hover:shadow-3xl transform transition-all hover:-translate-y-2">
              🔗 Connect TikTok Account
            </a>
            <p className="text-white/80 mt-6 text-lg">Submit videos • Track views • Leaderboard ranking</p>
          </div>

          {/* LinkedIn Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 hover:border-white/40 transition-all hover:scale-[1.02]">
            <div className="text-5xl mb-6">💼</div>
            <h2 className="text-3xl font-bold text-white mb-6">LinkedIn Integration</h2>
            <a href="/api/auth/linkedin" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-12 py-6 rounded-2xl text-xl font-bold block text-center shadow-2xl hover:shadow-3xl transform transition-all hover:-translate-y-2">
              🔗 Connect LinkedIn Account
            </a>
            <p className="text-white/80 mt-6 text-lg">Submit posts • Track impressions • Performance contests</p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-4xl font-bold text-white mb-8">🏆 Live Leaderboard</h3>
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/20 min-h-[200px]">
            <p className="text-white/60 text-xl">Top creators by total views → Real-time updates</p>
          </div>
        </div>
      </div>
    </div>
  );
}
