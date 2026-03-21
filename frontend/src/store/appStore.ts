import { create } from 'zustand';
import { ArbitrageOpportunity, SentimentDataPoint } from '../types';

interface AppState {
    arbitrageOpportunities: ArbitrageOpportunity[];
    addOpportunity: (opp: ArbitrageOpportunity) => void;

    // Mocking sentiment data store for the chart until NLP is wired later
    sentimentHistory: SentimentDataPoint[];
    addSentimentPoint: (point: SentimentDataPoint) => void;
}

export const useAppStore = create<AppState>((set) => ({
    arbitrageOpportunities: [],

    addOpportunity: (opp) => set((state) => {
        // Keep only top 50 recent opportunities
        const updated = [opp, ...state.arbitrageOpportunities].slice(0, 50);
        return { arbitrageOpportunities: updated };
    }),

    sentimentHistory: [
        // Mock initial data to populate the chart
        { timestamp: '10:00', price: 2100, sentimentScore: 0.1 },
        { timestamp: '10:05', price: 2120, sentimentScore: 0.4 },
        { timestamp: '10:10', price: 2150, sentimentScore: 0.6 },
        { timestamp: '10:15', price: 2140, sentimentScore: 0.2 },
        { timestamp: '10:20', price: 2160, sentimentScore: 0.7 },
        { timestamp: '10:25', price: 2180, sentimentScore: 0.8 },
    ],

    addSentimentPoint: (point) => set((state) => {
        const updated = [...state.sentimentHistory, point].slice(-20);
        return { sentimentHistory: updated };
    })
}));
