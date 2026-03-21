export interface ArbitrageOpportunity {
    commodity: string;
    buy_mandi: string;
    sell_mandi: string;
    buy_price: number;
    sell_price: number;
    spread: number;
    profit_margin_pct: number;
    timestamp: string;
}

export interface SentimentDataPoint {
    timestamp: string;
    price: number;
    sentimentScore: number; // Scale -1.0 to 1.0 (Bearish to Bullish)
}
