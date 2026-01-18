'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SubmitVideo() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const [videoUrl, setVideoUrl] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async () => {
    const videoId = videoUrl.match(/video\/(\d+)/)?.[1] || 'demo_123456';
    
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoUrl, videoId, platform: 'tiktok' }),
    });
    
    const data = await response.json();
    setResult(`✅ Views: ${data.views} | ID: ${data.submission_id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-teal-600 p-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-12 text-center">📱 TikTok Video Submit</h1>
        
        {status === 'tiktok_connected' && (
          <div className="bg-green-500/20 border-2 border-green-400 rounded-3xl p-8 mb-8 text-center">
            <h2 className="text-2xl font-bold text-green-100 mb-4">✅ TikTok Connected!</h2>
            <p className="text-green-50">Video submit చేయవచ్చు!</p>
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20">
          <input
            type="url"
            placeholder="https://www.tiktok.com/@username/video/123456789"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full p-6 text-xl border-2 border-white/30 rounded-2xl bg-white/20 mb-8 focus:border-white focus:outline-none"
          />
          
          <button 
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 px-8 rounded-2xl text-2xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all"
          >
            🚀 Submit Video & Track Views
          </button>
          
          {result && (
            <div className="mt-8 p-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl text-white text-xl font-bold text-center">
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
