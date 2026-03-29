"use client"

import { Activity, ArrowDownRight, ArrowUpRight, Globe } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTradeStore } from "@/store/useTradeStore"

const topMovers = [
    { crop: "Wheat", market: "Punjab", change: "+4.2%", trend: "up", price: "₹2,540" },
    { crop: "Rice", market: "Haryana", change: "-1.8%", trend: "down", price: "₹3,100" },
    { crop: "Soybean", market: "Madhya Pradesh", change: "+5.7%", trend: "up", price: "₹4,850" },
    { crop: "Maize", market: "Karnataka", change: "+2.1%", trend: "up", price: "₹2,100" },
]

export default function DashboardPage() {
    const { sentimentScore } = useTradeStore()

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 max-w-7xl mx-auto space-y-8"
        >
            <header>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Macro Command Center</h1>
                <p className="text-slate-500">Global agricultural oversight and market momentum.</p>
            </header>

            <section>
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Top Movers (24h)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {topMovers.map((mover, i) => (
                        <motion.div
                            key={mover.crop}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="shadow-sm border-slate-200">
                                <CardContent className="p-5 flex flex-col justify-between h-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-bold text-slate-900">{mover.crop}</h3>
                                            <p className="text-xs text-slate-500">{mover.market}</p>
                                        </div>
                                        <Badge variant={mover.trend === 'up' ? 'default' : 'destructive'} className={mover.trend === 'up' ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200' : 'bg-rose-100 text-rose-600 hover:bg-rose-200'}>
                                            {mover.trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                                        </Badge>
                                    </div>
                                    <div className="flex items-end justify-between mt-2">
                                        <span className="text-2xl font-black text-slate-900">{mover.price}</span>
                                        <span className={`font-semibold ${mover.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                            {mover.change}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="col-span-1 lg:col-span-2 shadow-sm border-slate-200 relative overflow-hidden">
                    <CardHeader className="relative z-10 pb-2">
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-xl">Regional Volatility Heatmap</CardTitle>
                                <CardDescription>Live commodity price shocks across India.</CardDescription>
                            </div>
                            <div className="bg-indigo-50 p-2 rounded-xl text-indigo-600">
                                <Globe className="h-5 w-5" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="h-80 w-full bg-slate-50 rounded-2xl border border-slate-100 relative overflow-hidden flex items-center justify-center">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                                transition={{ repeat: Infinity, duration: 4 }}
                                className="absolute top-1/4 left-1/4 w-48 h-48 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl"
                            />
                            <motion.div
                                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.7, 0.4] }}
                                transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                                className="absolute top-1/2 right-1/3 w-64 h-64 bg-rose-400 rounded-full mix-blend-multiply filter blur-3xl"
                            />
                            <p className="relative z-10 text-slate-400 font-medium">Interactive Map Rendered Here</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-indigo-900 to-slate-900 border-slate-800 shadow-xl text-white relative overflow-hidden flex flex-col items-center justify-center text-center p-8">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <Activity className="h-32 w-32" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-100 mb-2 relative z-10">Aggregate NLP Sentiment</h2>
                    <p className="text-sm text-slate-400 mb-8 max-w-[200px] relative z-10">Real-time market mood across all ingested policy and weather data.</p>
                    <div className="relative w-48 h-48 flex items-center justify-center z-10">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="96" cy="96" r="88" className="text-slate-800" strokeWidth="12" stroke="currentColor" fill="transparent" />
                            <circle cx="96" cy="96" r="88" className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" strokeWidth="12" strokeDasharray="550" strokeDashoffset={550 - (550 * sentimentScore) / 100} strokeLinecap="round" stroke="currentColor" fill="transparent" />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-5xl font-black text-white">{sentimentScore}<span className="text-2xl text-emerald-400 ml-1">%</span></span>
                            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mt-1">Bullish</span>
                        </div>
                    </div>
                </Card>
            </div>
        </motion.div>
    )
}
