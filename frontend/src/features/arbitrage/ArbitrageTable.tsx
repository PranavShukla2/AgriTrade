import React from 'react';
import { useAppStore } from '../../store/appStore';

export const ArbitrageTable: React.FC = () => {
    const { arbitrageOpportunities } = useAppStore();

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-lg font-semibold text-gray-800">Real-Time Arbitrage Opportunities</h2>
                <p className="text-sm text-gray-500">Live spreads across regional Mandis</p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-600 text-sm">
                        <tr>
                            <th className="px-6 py-3 font-medium">Time</th>
                            <th className="px-6 py-3 font-medium">Commodity</th>
                            <th className="px-6 py-3 font-medium">Buy At</th>
                            <th className="px-6 py-3 font-medium">Sell At</th>
                            <th className="px-6 py-3 font-medium">Spread (₹)</th>
                            <th className="px-6 py-3 font-medium">Profit Margin</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {arbitrageOpportunities.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                                    Listening for profitable spreads...
                                </td>
                            </tr>
                        ) : (
                            arbitrageOpportunities.map((opp, idx) => (
                                <tr key={idx} className="hover:bg-green-50/30 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(opp.timestamp).toLocaleTimeString()}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 capitalize">
                                        {opp.commodity}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">{opp.buy_mandi}</div>
                                        <div className="text-sm text-gray-500">₹{opp.buy_price.toFixed(2)}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">{opp.sell_mandi}</div>
                                        <div className="text-sm text-gray-500">₹{opp.sell_price.toFixed(2)}</div>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-green-600">
                                        ₹{opp.spread.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            {opp.profit_margin_pct.toFixed(1)}%
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
