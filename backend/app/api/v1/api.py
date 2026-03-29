from fastapi import APIRouter

api_router = APIRouter()

from app.api.v1.endpoints import market, arbitrage, intelligence, logistics, backtest

api_router.include_router(market.router, prefix="/market", tags=["market"])
api_router.include_router(arbitrage.router, prefix="/arbitrage", tags=["arbitrage"])
api_router.include_router(intelligence.router, prefix="/intelligence", tags=["intelligence"])
api_router.include_router(logistics.router, prefix="/logistics", tags=["logistics"])
api_router.include_router(backtest.router, prefix="/backtest", tags=["backtest"])
