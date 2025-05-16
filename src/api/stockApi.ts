import type { StockQuoteAPIResponse, Stock } from '../types/stock';

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;;
const BASE_URL = 'https://finnhub.io/api/v1';

const SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'AMZN'];

export async function fetchStockQuote(symbol: string): Promise<StockQuoteAPIResponse> {
  const response = await fetch(`${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`);
  if (!response.ok) throw new Error('API error');
  return response.json();
}

export async function fetchStocks(): Promise<Stock[]> {
  const stocks = await Promise.all(
    SYMBOLS.map(async (symbol) => {
      const data = await fetchStockQuote(symbol);

      return {
        symbol,
        currentPrice: data.c ?? null,
        openPrice: data.o ?? null,
        change: data.d ?? null,
        percentChange: data.dp ?? null,
      };
    })
  );

  return stocks;
}


export async function fetchStockHistory(
  currentPrice: number
): Promise<{ date: string; close: number }[]> {
  return new Promise((resolve) => {
    const today = new Date();
    const data: { date: string; close: number }[] = [];
    let price = currentPrice;

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      const change = (Math.random() - 0.5) * 2;
      price = Math.max(price + change, 0);

      data.push({
        date: date.toLocaleDateString(),
        close: Number(price.toFixed(2)),
      });
    }

    setTimeout(() => resolve(data), 500);
  });
}


