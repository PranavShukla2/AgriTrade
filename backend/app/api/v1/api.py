from fastapi import APIRouter

api_router = APIRouter()

from app.api.v1.endpoints import market, arbitrage

api_router.include_router(market.router, prefix="/market", tags=["market"])
api_router.include_router(arbitrage.router, prefix="/arbitrage", tags=["arbitrage"])
# api_router.include_router(news.router, prefix="/news", tags=["news"])
