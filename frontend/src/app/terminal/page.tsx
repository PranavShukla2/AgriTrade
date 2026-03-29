"use client"

import { useState, useEffect } from "react"
import { ArrowRightLeft, TrendingUp, AlertTriangle } from "lucide-react"

export default function TerminalPage() {
    const [orderbook, setOrderbook] = useState<{ bids: any[], asks: any[] }>({ bids: [], asks: [] })

    useEffect(() => {
        // Connect to FastAPI WebSocket for Level 2 Orderbook
        const ws = new WebSocket("ws://localhost:8000/api/v1/arbitrage/orderbook/ws")
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data)
            setOrderbook({ bids: data.bids, asks: data.asks })
        }
        return () => ws.close()
    }, [])

    return (
        <div className="h-full flex flex-col bg-slate-950 text-slate-300 overflow-hidden">

            {/* Top Banner */}
            <div className="h-14 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-6 shrink-0">
                <div className="flex items-center space-x-4">
                    <h1 className="text-lg font-bold text-white tracking-tight flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-indigo-400" />
                        Arbitrage Execution Terminal
                    </h1>
                    <span className="text-xs font-mono bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded border border-indigo-500/20">WHEAT/INR</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                    <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></div> Sockets Connected</span>
                </div>
            </div>

            {/* Main Trading View Area */}
            <div className="flex-1 flex overflow-hidden">

                {/* Left Column: Order Book */}
                <div className="w-80 border-r border-slate-800 flex flex-col bg-slate-900/50 relative">
                    <div className="p-4 border-b border-slate-800 font-semibold text-white sticky top-0 bg-slate-900/90 backdrop-blur z-10">
                        Level 2 Depth (Punjab vs Haryana)
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-6 font-mono text-sm">
                        {/* Asks (Sell Orders) */}
                        <div>
                            <div className="grid grid-cols-3 text-slate-500 mb-2 pb-2 border-b border-slate-800 text-xs">
                                <span>Price</span>
                                <span className="text-right">Size</span>
                                <span className="text-right">Total</span>
                            </div>
                            <div className="space-y-1">
                                {orderbook.asks.map((ask, i) => (
                                    <div key={i} className="grid grid-cols-3 relative group cursor-pointer hover:bg-slate-800/50 py-0.5 px-1 -mx-1 rounded">
                                        <div className="absolute right-0 top-0 bottom-0 bg-rose-500/10 z-0 transition-all" style={{ width: `${(ask.volume / 100) * 100}%` }}></div>
                                        <span className="text-rose-400 relative z-10">{ask.price.toFixed(2)}</span>
                                        <span className="text-right relative z-10">{ask.volume}</span>
                                        <span className="text-right text-slate-500 relative z-10">{(ask.price * ask.volume).toFixed(0)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Spread Indicator */}
                        <div className="flex items-center justify-center py-2 text-lg font-bold text-white bg-slate-800/50 rounded-lg border border-slate-700/50">
                            {orderbook.asks.length > 0 && orderbook.bids.length > 0 ? (
                                <>2501.40 <ArrowRightLeft className="w-4 h-4 mx-3 text-slate-500" /> 2498.50</>
                            ) : "Loading..."}
                        </div>

                        {/* Bids (Buy Orders) */}
                        <div>
                            <div className="space-y-1">
                                {orderbook.bids.map((bid, i) => (
                                    <div key={i} className="grid grid-cols-3 relative group cursor-pointer hover:bg-slate-800/50 py-0.5 px-1 -mx-1 rounded">
                                        <div className="absolute right-0 top-0 bottom-0 bg-emerald-500/10 z-0 transition-all" style={{ width: `${(bid.volume / 100) * 100}%` }}></div>
                                        <span className="text-emerald-400 relative z-10">{bid.price.toFixed(2)}</span>
                                        <span className="text-right relative z-10">{bid.volume}</span>
                                        <span className="text-right text-slate-500 relative z-10">{(bid.price * bid.volume).toFixed(0)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center: Charts & Execution */}
                <div className="flex-1 flex flex-col">

                    {/* Chart Area */}
                    <div className="flex-1 p-6 flex items-center justify-center border-b border-slate-800 relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-10">
                        {/* Embedded abstract placeholder for TradingView Lightweight charts */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-0"></div>
                        <div className="text-center z-10 p-8 rounded-2xl bg-slate-900/80 border border-slate-700 backdrop-blur-md">
                            <TrendingUp className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-2">TradingView Advanced Chart Engine</h3>
                            <p className="text-slate-400">Spread differential overlay loaded.</p>
                        </div>
                    </div>

                    {/* Execution Panel */}
                    <div className="h-64 bg-slate-950 p-6 flex space-x-6">
                        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col">
                            <h3 className="text-white font-semibold mb-4 flex items-center"><ArrowRightLeft className="w-4 h-4 mr-2 text-indigo-400" /> Calculate Cross-Mandi Arbitrage</h3>

                            <div className="grid grid-cols-2 gap-4 flex-1">
                                <div className="bg-slate-950 rounded-lg border border-slate-800 p-3">
                                    <span className="text-xs font-semibold text-slate-500 uppercase">Buy Market (Punjab)</span>
                                    <div className="text-xl font-mono text-emerald-400 mt-2">₹2498.50</div>
                                </div>
                                <div className="bg-slate-950 rounded-lg border border-slate-800 p-3">
                                    <span className="text-xs font-semibold text-slate-500 uppercase">Sell Market (Haryana)</span>
                                    <div className="text-xl font-mono text-rose-400 mt-2">₹2501.40</div>
                                </div>
                            </div>

                            <div className="flex space-x-4 mt-4 mt-auto">
                                <button className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
                                    Simulate Execution Route
                                </button>
                            </div>
                        </div>

                        <div className="w-80 bg-slate-900 border border-amber-900/30 rounded-xl p-5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full filter blur-2xl"></div>
                            <h3 className="text-amber-500 font-semibold mb-2 flex items-center"><AlertTriangle className="w-4 h-4 mr-2" /> Estimated Slippage</h3>
                            <p className="text-sm text-slate-400 mb-4">High volatility detected in Haryana due to recent policy changes.</p>
                            <div className="text-4xl font-black text-amber-400">1.2%</div>
                            <div className="text-xs text-slate-500 mt-2">Expected fill price impact.</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
