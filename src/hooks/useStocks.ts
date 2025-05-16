import { useState, useEffect } from 'react';
import type { Stock } from '../types/stock';
import { fetchStocks } from '../api/stockApi';

export function useStocks(interval = 10000) {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadStocks() {
    setLoading(true);
    try {
      const data = await fetchStocks();
      setStocks(data);
      setError(null);
    } catch {
      setError('Превышен лимит запросов. Попробуйте позже.');
      setStocks([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStocks();
    const timer = setInterval(loadStocks, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return { stocks, loading, error, reload: loadStocks };
}
