from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf
import pandas as pd


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"info": "engine online!"}


@app.get("/simulate/{ticker}")
def simulate_strategy(ticker: str, window: int = 30):
    try:
        data = yf.download(ticker, period="1y", interval="1d", progress=False)

        if data.empty:
            return {"error": "ticker unknown"}
    
    except Exception as err:
        return {"error": err}
    
    data = data['Close'].reset_index()
    data.columns = ['Date', 'Price']

    data['MA'] = data['Price'].rolling(window=window).mean()

    current_price = data['Price'].iloc[-1]
    start_price = data['Price'].iloc[0]

    market_return = ((current_price - start_price) / start_price) * 100

    return {
        "ticker": ticker.upper(),
        "period": "1y",
        "current_price": round(current_price, 2),
        "window": window,
        "market_return_percent": round(market_return, 2),
        "chart_data": data[['Date', 'Price', 'MA']].dropna().to_dict(orient='records')
    }


# uvicorn main:app --reload