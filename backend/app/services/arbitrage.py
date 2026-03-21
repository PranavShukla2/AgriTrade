from typing import Dict, List, Optional
from datetime import datetime
from app.schemas.commodity import PriceTick, ArbitrageOpportunity

class ArbitrageEngine:
    def __init__(self):
        # In-memory dict for rapid tick access during prototype.
        # Structure: { "commodity_name": { "mandi_name": current_price } }
        # production would use Redis
        self.latest_prices: Dict[str, Dict[str, float]] = {}
        
        # Base assumed transport/logistic cost per unit spread 
        # (Very simplified for demonstration)
        self.transport_cost = 5.0 # e.g. 5 rupees/unit

    def process_tick(self, tick: PriceTick) -> Optional[ArbitrageOpportunity]:
        """
        Processes a single price tick and returns the best arbitrage opportunity,
        if any, that currently exists for that commodity.
        """
        if tick.commodity not in self.latest_prices:
            self.latest_prices[tick.commodity] = {}
        
        # update current price
        self.latest_prices[tick.commodity][tick.mandi] = tick.price
        
        return self._find_best_arbitrage(tick.commodity)

    def _find_best_arbitrage(self, commodity: str) -> Optional[ArbitrageOpportunity]:
        mandis = self.latest_prices.get(commodity, {})
        if len(mandis) < 2:
            return None
        
        # Find min and max prices
        buy_mandi = min(mandis, key=mandis.get)
        sell_mandi = max(mandis, key=mandis.get)
        
        buy_price = mandis[buy_mandi]
        sell_price = mandis[sell_mandi]
        
        spread = sell_price - buy_price
        
        # Only consider it an opportunity if it covers logistic costs
        # and leaves a profit margin.
        net_profit = spread - self.transport_cost
        
        if net_profit > 0:
            profit_margin_pct = (net_profit / buy_price) * 100
            
            return ArbitrageOpportunity(
                commodity=commodity,
                buy_mandi=buy_mandi,
                sell_mandi=sell_mandi,
                buy_price=buy_price,
                sell_price=sell_price,
                spread=spread,
                profit_margin_pct=profit_margin_pct,
                timestamp=datetime.utcnow()
            )
            
        return None

# Singleton instance for the app lifecycle
engine = ArbitrageEngine()
