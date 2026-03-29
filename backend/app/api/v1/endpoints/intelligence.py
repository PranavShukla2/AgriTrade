from fastapi import APIRouter
from app.services.sentiment_engine import sentiment_engine
from app.services.time_series_forecaster import time_series_model

router = APIRouter()

@router.get("/feed")
async def stream_live_intelligence():
    """Returns the latest NLP-analyzed market events."""
    data = await sentiment_engine.analyze_feed()
    return {"status": "success", "data": data}

@router.get("/forecast")
async def get_price_forecast(commodity: str, current_price: float, sentiment_score: float = 0.0):
    """Returns deep-learning LSTM price forecasts based on sentiment."""
    data = await time_series_model.predict_price_movement(commodity, current_price, sentiment_score)
    return {"status": "success", "data": data}
