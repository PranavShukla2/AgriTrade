import asyncio
import random
from typing import Dict, Any

class SentimentEngineMock:
    """Mock Deep Learning NLP model generating article sentiment and tagging entities."""
    
    def __init__(self):
        self.entities = ["Wheat (Punjab)", "Rice (Haryana)", "Soybean (MP)", "Govt Policy", "Monsoon Array"]
    
    async def analyze_feed(self) -> Dict[str, Any]:
        """Simulates ingestion and analysis of market news."""
        await asyncio.sleep(0.5)  # Simulate GPU latency
        
        entity = random.choice(self.entities)
        sentiment_score = random.uniform(-1.0, 1.0)
        
        impact = "Positive" if sentiment_score > 0.3 else "Negative" if sentiment_score < -0.3 else "Neutral"
        alert = f"Detected {impact} sentiment cluster around {entity}."
        
        return {
            "entity": entity,
            "sentiment_score": round(sentiment_score, 3),
            "confidence": round(random.uniform(0.7, 0.99), 2),
            "alert": alert,
            "timestamp": "now"
        }

sentiment_engine = SentimentEngineMock()
