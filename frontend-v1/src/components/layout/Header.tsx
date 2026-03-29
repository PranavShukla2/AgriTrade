import { Link, useLocation } from 'react-router-dom';
import { LineChart, LayoutDashboard } from 'lucide-react';
import { cn } from '../../utils/cn';

export function Header() {
    const location = useLocation();

    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
            <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2 text-indigo-600">
                    <LineChart className="h-6 w-6" />
                    <span className="text-lg font-bold">AgriTrade<span className="text-gray-800">.AI</span></span>
                </Link>

                <nav className="flex items-center space-x-6">
                    <Link
                        to="/"
                        className={cn("text-sm font-medium transition-colors hover:text-indigo-600", location.pathname === '/' ? "text-indigo-600" : "text-gray-500")}
                    >
                        Overview
                    </Link>
                    <Link
                        to="/dashboard"
                        className={cn("text-sm font-medium transition-colors hover:text-indigo-600", location.pathname === '/dashboard' ? "text-indigo-600" : "text-gray-500")}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/dashboard"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center space-x-2 shadow-sm shadow-indigo-200"
                    >
                        <span>Launch App</span>
                        <LayoutDashboard className="h-4 w-4" />
                    </Link>
                </nav>
            </div>
        </header>
    );
}
