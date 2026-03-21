import React from 'react';
import {
    ResponsiveContainer, Area, XAxis, YAxis,
    CartesianGrid, Tooltip, Legend, ComposedChart, Line
} from 'recharts';
import { useAppStore } from '../../store/appStore';

export const SentimentChart: React.FC = () => {
    const { sentimentHistory } = useAppStore();

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-96 w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Price Momentum vs. News Sentiment</h2>
            <p className="text-sm text-gray-500 mb-6">Correlating NLP sentiment scores with commodity price movements.</p>

            <ResponsiveContainer width="100%" height="80%">
                <ComposedChart data={sentimentHistory}>
                    <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis
                        dataKey="timestamp"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        dy={10}
                    />

                    {/* Left Axis for Commodity Price */}
                    <YAxis
                        yAxisId="left"
                        orientation="left"
                        stroke="#10B981"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        domain={['dataMin - 50', 'dataMax + 50']}
                    />

                    {/* Right Axis for Sentiment Score (-1 to 1) */}
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke="#6366F1"
                        axisLine={false}
                        tickLine={false}
                        domain={[-1, 1]}
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                    />

                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />

                    <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="price"
                        name="Commodity Price (₹)"
                        stroke="#10B981"
                        fillOpacity={1}
                        fill="url(#colorPrice)"
                        strokeWidth={2}
                    />

                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="sentimentScore"
                        name="NLP NLP Sentiment"
                        stroke="#6366F1"
                        strokeWidth={3}
                        dot={{ r: 4, strokeWidth: 2 }}
                        activeDot={{ r: 6 }}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};
