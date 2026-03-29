import { create } from 'zustand'

export interface TradeState {
    activeCommodity: string;
    setActiveCommodity: (commodity: string) => void;
    sentimentScore: number;
    setSentimentScore: (score: number) => void;
}

export const useTradeStore = create<TradeState>((set) => ({
    activeCommodity: 'Wheat',
    setActiveCommodity: (commodity) => set({ activeCommodity: commodity }),
    sentimentScore: 72,
    setSentimentScore: (score) => set({ sentimentScore: score }),
}))
