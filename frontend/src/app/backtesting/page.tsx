"use client"

import { useState } from "react"
import { BarChart3, Settings2, ShieldAlert } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function BacktestingPage() {
    const [params, setParams] = useState({
        commodity: "WHEAT",
        start_date: "2024-01-01",
        end_date: "2024-12-31",
        sentiment_threshold: 0.75
    })

    const [results, setResults] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const runBacktest = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            // Mock backend response if not available
            setTimeout(() => {
                setResults({
                    net_profit_inr: 1450200,
                    max_drawdown_percent: 4.2,
                    total_trades: 128,
                    win_rate_percent: 68.5
                })
                setLoading(false)
            }, 1000)
        } catch (err) {
            console.error(err)
            setLoading(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 max-w-7xl mx-auto space-y-8 bg-slate-50 min-h-full"
        >
            <header className="flex flex-col mb-8">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center">
                    <BarChart3 className="w-8 h-8 mr-3 text-indigo-600" />
                    Strategy Backtesting Center
                </h1>
                <p className="text-slate-500 mt-2 text-lg">Test NLP-driven quantitative models against historical tick data.</p>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <Card className="xl:col-span-1 shadow-sm border-slate-200">
                    <CardHeader className="border-b border-slate-100 pb-4">
                        <CardTitle className="text-lg flex items-center">
                            <Settings2 className="w-5 h-5 mr-2 text-slate-400" /> Engine Parameters
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={runBacktest} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Asset Class</label>
                                <select
                                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                    value={params.commodity}
                                    onChange={e => setParams({ ...params, commodity: e.target.value })}
                                >
                                    <option value="WHEAT">Wheat (Soft Red Winter)</option>
                                    <option value="RICE">Basmati Rice</option>
                                    <option value="SOY">Soybean Futures</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Start Date</label>
                                    <Input type="date" value={params.start_date} onChange={e => setParams({ ...params, start_date: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">End Date</label>
                                    <Input type="date" value={params.end_date} onChange={e => setParams({ ...params, end_date: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Sentiment Entry Threshold (&gt;0.0)</label>
                                <input type="range" min="0" max="1" step="0.05" value={params.sentiment_threshold} onChange={e => setParams({ ...params, sentiment_threshold: parseFloat(e.target.value) })} className="w-full accent-indigo-600" />
                                <div className="text-right text-xs font-mono font-bold text-indigo-600 mt-1">{params.sentiment_threshold.toFixed(2)}</div>
                            </div>
                            <Button type="submit" disabled={loading} className="w-full mt-4 bg-slate-900 hover:bg-indigo-600 text-white font-bold py-6 rounded-xl transition-all shadow-md mt-6">
                                {loading ? "Simulating Strategy..." : "Execute Backtest"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="xl:col-span-2 flex flex-col space-y-6">
                    <AnimatePresence mode="wait">
                        {results ? (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="grid grid-cols-2 gap-6"
                            >
                                <Card className="border-l-4 border-l-emerald-500 shadow-sm text-center">
                                    <CardContent className="p-6">
                                        <h3 className="text-slate-500 font-semibold mb-2">Simulated Net Profit</h3>
                                        <p className="text-5xl font-black text-emerald-500">₹{results.net_profit_inr.toLocaleString()}</p>
                                        <span className="inline-block mt-3 text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-bold uppercase">+14.2% Return</span>
                                    </CardContent>
                                </Card>
                                <Card className="shadow-sm flex flex-col justify-center">
                                    <CardContent className="p-6 text-center">
                                        <h3 className="text-slate-500 font-semibold mb-2">Maximum Drawdown</h3>
                                        <p className="text-4xl font-black text-rose-500">{results.max_drawdown_percent}%</p>
                                        <span className="text-sm border-t border-slate-100 mt-4 pt-4 text-slate-500 flex items-center justify-center"><ShieldAlert className="w-4 h-4 mr-2" /> Acceptable Risk Tolerance.</span>
                                    </CardContent>
                                </Card>
                                <Card className="shadow-sm flex flex-col justify-center text-center">
                                    <CardContent className="p-6">
                                        <h3 className="text-slate-500 font-semibold mb-2">Trades Executed</h3>
                                        <p className="text-4xl font-black text-slate-800">{results.total_trades}</p>
                                    </CardContent>
                                </Card>
                                <Card className="shadow-sm flex flex-col justify-center text-center">
                                    <CardContent className="p-6">
                                        <h3 className="text-slate-500 font-semibold mb-2">Win Rate</h3>
                                        <p className="text-4xl font-black text-indigo-500">{results.win_rate_percent}%</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="placeholder"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex-1 bg-white border border-slate-200 border-dashed rounded-3xl flex items-center justify-center min-h-[400px]"
                            >
                                <div className="text-center text-slate-400">
                                    <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50 text-slate-300" />
                                    <p className="font-medium">Awaiting Execution Parameters</p>
                                    <p className="text-sm mt-1">Configure and run your strategy to view performance metrics.</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    )
}
