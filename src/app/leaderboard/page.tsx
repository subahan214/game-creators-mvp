'use client';
import { useEffect, useState } from 'react';

interface Submission {
  id: string;
  video_url: string;
  views: number;
  platform: string;
  submitted_at: string;
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/leaderboard');
      const data = await response.json();
      
      // Group by user and sum views
      const userTotals: { [key: string]: number } = {};
      data.forEach((sub: Submission) => {
        userTotals[sub.id] = (userTotals[sub.id] || 0) + sub.views;
      });

      const leaderboardData = Object.entries(userTotals)
        .map(([userId, totalViews]) => ({
          id: userId,
          video_url: 'Multiple videos',
          views: totalViews as number,
          platform: 'tiktok',
          submitted_at: new Date().toISOString()
        }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10);

      setLeaderboard(leaderboardData);
    } catch (error) {
      console.error('Leaderboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(fetchLeaderboard, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading leaderboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent mb-6">
            🏆 LIVE LEADERBOARD
          </h1>
          <p className="text-white/80 text-xl">Top Creators by Total Views</p>
          <button 
            onClick={fetchLeaderboard}
            className="mt-6 bg-white/20 hover:bg-white/30 backdrop-blur-xl px-8 py-3 rounded-2xl text-white font-bold text-lg transition-all hover:scale-105"
          >
            🔄 Refresh
          </button>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white/5 backdrop-blur-xl rounded-4xl border border-white/20 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/10">
                  <th className="p-6 text-left text-xl font-bold text-white">Rank</th>
                  <th className="p-6 text-left text-xl font-bold text-white">Creator</th>
                  <th className="p-6 text-right text-xl font-bold text-white">Views</th>
                  <th className="p-6 text-right text-xl font-bold text-white">Videos</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr key={entry.id} className="hover:bg-white/10 transition-all border-b border-white/10 last:border-b-0">
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-2xl font-bold text-black">
                          {index + 1}
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div>
                        <div className="text-white font-bold text-xl capitalize">{entry.id.slice(0, 8)}...</div>
                        <div className="text-white/60 text-sm">{entry.platform.toUpperCase()}</div>
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <div className="text-2xl font-black text-white">
                        {entry.views.toLocaleString()}
                      </div>
                      <div className="text-green-400 font-bold text-sm">+{entry.views.toLocaleString()} total</div>
                    </td>
                    <td className="p-6 text-right">
                      <span className="px-4 py-1 bg-white/20 rounded-full text-white text-sm font-bold">
                        {entry.video_url === 'Multiple videos' ? 'MULTI' : '1'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 text-center">
            <div className="text-4xl font-black text-white">{leaderboard.length}</div>
            <div className="text-white/60 text-lg mt-2">Active Creators</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 text-center">
            <div className="text-4xl font-black text-white">
              {leaderboard.reduce((sum, entry) => sum + entry.views, 0).toLocaleString()}
            </div>
            <div className="text-white/60 text-lg mt-2">Total Views</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 text-center">
            <div className="text-4xl font-bold text-green-400">
              #{Math.floor(Math.random() * 10) + 1}
            </div>
            <div className="text-white/60 text-lg mt-2">Your Rank</div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center mt-16">
          <div className="inline-flex gap-4">
            <a href="/dashboard" className="bg-white/20 hover:bg-white/30 backdrop-blur-xl px-8 py-4 rounded-2xl text-white font-bold text-lg transition-all hover:scale-105">
              ← Back to Dashboard
            </a>
            <a href="/submit" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-8 py-4 rounded-2xl text-white font-bold text-lg transition-all hover:scale-105">
              📹 Submit Video
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
