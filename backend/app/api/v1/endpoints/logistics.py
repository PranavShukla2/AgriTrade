from fastapi import APIRouter
import random

router = APIRouter()

@router.get("/weather")
async def get_weather_impact(mandi_id: str):
    """Simulates weather API fetching radar and regional anomalies."""
    issues = ["Heavy Rainfall", "Drought", "Optimal", "Flood Warning", "Heatwave"]
    return {
        "status": "success",
        "data": {
            "mandi_id": mandi_id,
            "condition": random.choice(issues),
            "precipitation_mm": round(random.uniform(0.0, 150.0), 1),
            "temperature_c": round(random.uniform(15.0, 45.0), 1)
        }
    }

@router.post("/route")
async def calculate_route_cost(source: str, destination: str, mass_tons: float):
    """Simulates dynamic transport cost calculation for logistics."""
    distance_km = random.uniform(50.0, 1500.0)
    fuel_rate = 95.5 # INR per L
    efficiency = 4.5 # km/L
    
    total_cost = (distance_km / efficiency) * fuel_rate * (mass_tons * 0.1)
    
    return {
        "status": "success",
        "data": {
            "source": source,
            "destination": destination,
            "distance_km": round(distance_km, 2),
            "estimated_freight_inr": round(total_cost, 2),
            "eta_hours": round(distance_km / 60.0, 1) # ~60 km/h avg speed
        }
    }
