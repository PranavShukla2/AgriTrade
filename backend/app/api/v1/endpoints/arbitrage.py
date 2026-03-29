from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List
import json
from app.schemas.commodity import ArbitrageOpportunity

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast_opportunity(self, opportunity: ArbitrageOpportunity):
        # We need a custom serializer for datetime
        data = json.dumps(opportunity.dict(), default=str)
        
        # Collect dead connections to remove
        dead_connections = []
        for connection in self.active_connections:
            try:
                await connection.send_text(data)
            except Exception:
                dead_connections.append(connection)
                
        # Cleanup
        for dead in dead_connections:
            self.disconnect(dead)

# Global manager instance
manager = ConnectionManager()


@router.websocket("/ws")
async def arbitrage_websocket(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@router.websocket("/orderbook/ws")
async def orderbook_websocket(websocket: WebSocket):
    """Streams simulated Level 2 Order Book depth."""
    await websocket.accept()
    import asyncio, random
    try:
        while True:
            # Simulate Bids and Asks
            base_price = 2500.0
            bids = [{"price": round(base_price - i*2 - random.random(), 2), "volume": random.randint(10, 100)} for i in range(5)]
            asks = [{"price": round(base_price + i*2 + random.random(), 2), "volume": random.randint(10, 100)} for i in range(5)]
            
            payload = {
                "commodity": "Wheat",
                "bids": sorted(bids, key=lambda x: x["price"], reverse=True),
                "asks": sorted(asks, key=lambda x: x["price"])
            }
            await websocket.send_json(payload)
            await asyncio.sleep(1.0)
    except WebSocketDisconnect:
        pass
