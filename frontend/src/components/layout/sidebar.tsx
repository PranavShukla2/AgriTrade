"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Globe, LineChart, Cpu, Settings, Activity } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
    { href: "/dashboard", icon: Globe, label: "Macro Command Center" },
    { href: "/terminal", icon: LineChart, label: "Arbitrage Terminal" },
    { href: "/intelligence", icon: Cpu, label: "AI Intelligence Hub" },
    { href: "/logistics", icon: Activity, label: "Supply Chain & Weather" },
    { href: "/backtesting", icon: BarChart3, label: "Strategy Analytics" },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex h-screen w-64 flex-col border-r border-slate-200 bg-slate-950 text-slate-100">
            <div className="p-6">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                        <LineChart className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">AgriTrade<span className="text-indigo-400">.v2</span></span>
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3">
                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link key={item.href} href={item.href}>
                                <Button
                                    variant={isActive ? "secondary" : "ghost"}
                                    className={cn(
                                        "w-full justify-start text-sm font-medium transition-colors",
                                        isActive ? "bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600/20" : "text-slate-400 hover:bg-slate-900 hover:text-slate-100"
                                    )}
                                >
                                    <item.icon className="mr-3 h-5 w-5" />
                                    {item.label}
                                </Button>
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="border-t border-slate-800 p-4">
                <Button variant="ghost" className="w-full justify-start text-slate-400 hover:bg-slate-900 hover:text-slate-100">
                    <Settings className="mr-3 h-5 w-5" />
                    Settings
                </Button>
            </div>
        </div>
    )
}
