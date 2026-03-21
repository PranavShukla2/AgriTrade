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
            # We don't necessarily expect data from client, but we must wait to detect disconnect
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)
