import { useWebSocket } from '../hooks/useWebSocket';
import { ArbitrageTable } from '../features/arbitrage/ArbitrageTable';
import { SentimentChart } from '../features/sentiment/SentimentChart';

export function DashboardPage() {
    // Initialize the WebSocket connection when the dashboard mounts
    const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/api/v1/arbitrage/ws';
    useWebSocket(WS_URL);

    return (
        <div className="min-h-screen bg-gray-50 p-8 pt-24">
            <div className="max-w-7xl mx-auto space-y-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Live Market Intelligence</h1>
                    <p className="text-gray-500 mt-2">Real-time commodity arbitrage and sentiment tracking.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Sentiment Analysis Section */}
                    <div className="col-span-1 lg:col-span-2">
                        <SentimentChart />
                    </div>

                    {/* Arbitrage Opportunities Section */}
                    <div className="col-span-1 lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-hidden w-full">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Detected Arbitrage Opportunities</h2>
                            <ArbitrageTable />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
