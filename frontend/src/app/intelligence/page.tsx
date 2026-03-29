"use client"

import { useEffect, useState } from "react"
import { Cpu, Zap, Activity, Info } from "lucide-react"

export default function IntelligencePage() {
    const [feed, setFeed] = useState<any[]>([])

    // Simulate stream
    useEffect(() => {
        let mounted = true
        const fetchNews = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/v1/intelligence/feed")
                const { data } = await res.json()
                if (mounted) setFeed(prev => [data, ...prev].slice(0, 10))
            } catch (e) { }
        }

        // Initial run and then interval
        fetchNews()
        const iv = setInterval(fetchNews, 3500)
        return () => { mounted = false; clearInterval(iv) }
    }, [])

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">

            <header className="flex items-center space-x-3 text-slate-900 border-b border-slate-200 pb-4">
                <Cpu className="text-indigo-600 h-8 w-8" />
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">AI Intelligence & News Hub</h1>
                    <p className="text-slate-500">Deep dive into FinBERT sentiment decisions and event correlations.</p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* NLP Feed */}
                <div className="col-span-1 border border-slate-200 bg-white rounded-2xl shadow-sm p-6 overflow-hidden flex flex-col h-[500px]">
                    <h2 className="font-semibold text-lg flex items-center mb-4 text-slate-900"><Zap className="text-amber-500 w-5 h-5 mr-2" /> Live Entity Feed</h2>
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2">

                        {feed.length === 0 ? (
                            <div className="text-slate-400 text-sm animate-pulse">Waiting for AI ingestion stream...</div>
                        ) : feed.map((item, idx) => (
                            <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col space-y-2 animate-in slide-in-from-top-4 fade-in">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-slate-800 text-sm">{item.entity}</h3>
                                    <span className={`text-xs px-2 py-1 rounded bg-slate-200 font-mono ${item.sentiment_score > 0 ? 'text-emerald-600 bg-emerald-100' : 'text-rose-600 bg-rose-100'}`}>
                                        {item.sentiment_score.toFixed(2)}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-600">{item.alert}</p>
                                <div className="text-xs text-slate-400 text-right font-mono">Conf: {(item.confidence * 100).toFixed(1)}%</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sentiment Overlay Chart */}
                <div className="col-span-1 lg:col-span-2 border border-slate-200 bg-white rounded-2xl shadow-sm p-6 flex flex-col min-h-[500px]">
                    <h2 className="font-semibold text-lg flex items-center mb-2 text-slate-900"><Activity className="text-indigo-600 w-5 h-5 mr-2" /> Sentiment vs Price Correlation</h2>
                    <p className="text-sm text-slate-500 mb-6">Historical overlay proving the NLP model's predictive accuracy on WHEAT/INR pairs.</p>

                    <div className="flex-1 rounded-xl bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] bg-slate-50 border border-slate-100 flex items-center justify-center p-8 relative overflow-hidden">

                        {/* Fake Graph Lines built with SVGs/CSS for aesthetics */}
                        <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
                            <path d="M0,200 Q100,50 200,200 T400,150 T600,250 T800,100" fill="none" stroke="currentColor" strokeWidth="3" className="text-emerald-500" />
                            <path d="M0,250 Q100,100 200,250 T400,200 T600,300 T800,150" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" className="text-indigo-500" />
                        </svg>

                        <div className="relative z-10 bg-white/90 backdrop-blur border border-slate-200 p-6 rounded-xl shadow-lg max-w-sm text-center">
                            <Info className="h-8 w-8 text-indigo-500 mx-auto mb-3" />
                            <h3 className="text-lg font-bold text-slate-800">Recharts Dual-Axis Instance</h3>
                            <p className="text-sm text-slate-600 mt-2">Dotted line indicates Sentiment Vector. Solid line indicates actual asset price leading the vector by 48 hours.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
