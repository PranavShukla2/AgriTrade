from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class PriceTick(BaseModel):
    commodity: str
    mandi: str
    price: float
    timestamp: Optional[datetime] = None

class ArbitrageOpportunity(BaseModel):
    commodity: str
    buy_mandi: str
    sell_mandi: str
    buy_price: float
    sell_price: float
    spread: float
    profit_margin_pct: float
    timestamp: datetime
