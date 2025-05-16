export interface StockQuoteAPIResponse {
  c: number;  // текущая цена акции
  o: number;  // цена открытия дня
  d: number;  // изменение цены
  dp: number; // процентное изменение
}

export interface Stock {
  symbol: string;
  currentPrice: number | null;
  openPrice: number | null;
  change: number | null;
  percentChange: number | null;
}
