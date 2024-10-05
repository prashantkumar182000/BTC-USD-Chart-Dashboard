# backend/main.py

from fastapi import FastAPI, HTTPException
import requests

app = FastAPI()

@app.get("/api/getMarketData")
async def get_market_data(interval: str):
    # Map the frontend intervals to Binance-compatible intervals
    interval_map = {
        "1m": "1m",
        "5m": "5m",
        "1h": "1h",
        "24h": "15m",  # Use 15m for the last 24 hours
        "5d": "1d",    # Daily data for the last 5 days
        "1M": "1M",    # Monthly data
        "3M": "3M",    # Quarterly data
    }

    # Default to "1d" if the interval is not found in the mapping
    binance_interval = interval_map.get(interval, "1d")

    # Fetch data from Binance using the mapped interval
    binance_url = "https://api.binance.com/api/v3/klines"
    params = {
        "symbol": "BTCUSDT",
        "interval": binance_interval,
        "limit": 500,  # Number of data points to fetch
    }

    try:
        response = requests.get(binance_url, params=params)
        response.raise_for_status()  # Raise an error for bad responses
    except requests.exceptions.HTTPError as err:
        raise HTTPException(status_code=response.status_code, detail=str(err))

    # Process and return the data
    market_data = response.json()
    formatted_data = [
        {
            "time": item[0] / 1000,  # Convert from milliseconds to seconds
            "open": float(item[1]),
            "high": float(item[2]),
            "low": float(item[3]),
            "close": float(item[4]),
        }
        for item in market_data
    ]

    return formatted_data
