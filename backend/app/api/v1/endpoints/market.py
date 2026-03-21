from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime

from app.schemas.commodity import PriceTick
from app.services.arbitrage import engine
from app.api.v1.endpoints.arbitrage import manager

router = APIRouter()

@router.post("/tick", response_model=dict)
async def ingest_price_tick(tick: PriceTick):
    if not tick.timestamp:
        tick.timestamp = datetime.utcnow()
        
    # Process tick through arbitrage engine
    opportunity = engine.process_tick(tick)
    
    # If a profitable spread exists, broadcast via WebSocket
    if opportunity:
        await manager.broadcast_opportunity(opportunity)
        
    return {"status": "success", "tick_accepted": tick.dict()}

@router.get("/spreads", response_model=dict)
def get_current_spreads():
    """Debug endpoint to see raw state of prices"""
    return {"prices": engine.latest_prices}
