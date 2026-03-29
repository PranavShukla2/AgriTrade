"use client"

import { useState } from "react"
import { Map, Zap, CloudLightning, ShieldCheck } from "lucide-react"

export default function LogisticsPage() {
    const [source, setSource] = useState("Punjab_Mandi_A")
    const [dest, setDest] = useState("Haryana_Mandi_B")
    const [mass, setMass] = useState(10)
    const [routeData, setRouteData] = useState<any>(null)

    const calculateRoute = async () => {
        try {
            const resp = await fetch(`http://localhost:8000/api/v1/logistics/route?source=${source}&destination=${dest}&mass_tons=${mass}`, { method: 'POST' })
            const json = await resp.json()
            setRouteData(json.data)
        } catch (e) { }
    }

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

            <header className="flex items-center justify-between pb-6 border-b border-slate-200">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Supply Chain & Weather Logistics</h1>
                    <p className="text-slate-500 mt-2">Correlate physical world disruptions with market spreads.</p>
                </div>
                <Map className="w-10 h-10 text-emerald-500" />
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Weather Radar Mock */}
                <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden min-h-[400px]">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center mb-6"><CloudLightning className="mr-3 w-6 h-6 text-sky-500" /> Live Weather Anomalies</h2>

                    <div className="absolute inset-0 top-16 right-0 left-0 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] bg-blue-50/50 flex items-center justify-center border-t border-slate-100">

                        {/* Radar Sweep Animation Simulation */}
                        <div className="relative w-64 h-64 border-4 border-sky-200 rounded-full flex items-center justify-center bg-sky-100/30 overflow-hidden">
                            <div className="absolute top-0 bottom-1/2 left-0 right-1/2 origin-bottom-right bg-gradient-to-br from-transparent to-sky-400/40 animate-spin" style={{ animationDuration: '3s' }}></div>

                            {/* Blips */}
                            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-rose-500 rounded-full shadow-[0_0_10px_rgba(244,63,94,1)] animate-ping"></div>
                            <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-amber-500 rounded-full shadow-[0_0_12px_rgba(245,158,11,1)]"></div>
                        </div>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="bg-white/90 backdrop-blur p-4 rounded-xl border border-slate-200 shadow flex items-center justify-between">
                            <div>
                                <h4 className="font-bold text-slate-800 text-sm">Heavy Rainfall Detected</h4>
                                <p className="text-xs text-slate-500">Punjab Region</p>
                            </div>
                            <span className="bg-rose-100 text-rose-700 text-xs font-bold px-3 py-1 rounded-full uppercase">Impact: Severe</span>
                        </div>
                    </div>
                </section>

                {/* Transport Cost Calculator */}
                <section className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold flex items-center mb-2"><Zap className="mr-3 w-6 h-6 text-indigo-400" /> Route Optimization</h2>
                        <p className="text-slate-400 text-sm mb-8">Calculate live freight costs connecting two spread markets.</p>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1 block">Source Mandi</label>
                                <select className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-3 outline-none" value={source} onChange={(e) => setSource(e.target.value)}>
                                    <option>Punjab_Mandi_A</option>
                                    <option>UP_Mandi_Zone1</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1 block">Destination Mandi</label>
                                <select className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-3 outline-none" value={dest} onChange={(e) => setDest(e.target.value)}>
                                    <option>Haryana_Mandi_B</option>
                                    <option>Delhi_Central</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1 block">Cargo Payload (Tons)</label>
                                <input type="number" className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-3 outline-none" value={mass} onChange={(e) => setMass(Number(e.target.value))} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <button onClick={calculateRoute} className="w-full bg-indigo-600 hover:bg-indigo-500 transition-colors py-4 rounded-xl font-bold flex items-center justify-center">
                            Calculate Neural Route
                        </button>

                        {routeData && (
                            <div className="mt-6 bg-slate-800 p-5 rounded-xl border border-slate-700 animate-in slide-in-from-bottom-2">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="block text-xs text-slate-400 uppercase">Estimated Cost</span>
                                        <span className="text-xl font-mono text-emerald-400 font-bold">₹{routeData.estimated_freight_inr}</span>
                                    </div>
                                    <div>
                                        <span className="block text-xs text-slate-400 uppercase">Distance</span>
                                        <span className="text-xl font-mono text-white font-bold">{routeData.distance_km} km</span>
                                    </div>
                                    <div>
                                        <span className="block text-xs text-slate-400 uppercase">Transit Time</span>
                                        <span className="text-xl font-mono text-amber-400 font-bold">{routeData.eta_hours} hrs</span>
                                    </div>
                                    <div className="flex items-center justify-end text-emerald-500">
                                        <ShieldCheck className="w-8 h-8 opacity-50" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

            </div>
        </div>
    )
}
