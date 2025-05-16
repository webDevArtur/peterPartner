import { useMemo, useState } from 'react';
import { useStocks } from '../hooks/useStocks';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import StockRow from './StockRow';
import StockChartModal from './StockChartModal';
import Error from './Error';
import { FILTERS } from '../constants/filters';
import type { FilterValue } from '../constants/filters';

interface StockTableProps {
  search: string;
  filter: FilterValue;
}

function StockTable({ search, filter }: StockTableProps) {
  const { stocks, loading, error, reload } = useStocks(5000);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);

  const filteredStocks = useMemo(() => {
    return stocks.filter(({ symbol, currentPrice, openPrice }) => {
      const matchesSearch = symbol.toLowerCase().includes(search.toLowerCase());
      if (!matchesSearch) return false;

      if (filter === FILTERS.GROWING) return currentPrice !== null && openPrice !== null && currentPrice > openPrice;
      if (filter === FILTERS.FALLING) return currentPrice !== null && openPrice !== null && currentPrice < openPrice;

      return true;
    });
  }, [stocks, search, filter]);


  if (error) {
    return (
      <Error message={error} onRetry={reload} />
    );
  }

return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="stockTable">
          <TableHead>
            <TableRow>
              <TableCell>Символ</TableCell>

              <TableCell align="right">Текущая цена</TableCell>
              
              <TableCell align="right">Цена открытия</TableCell>

              <TableCell align="right">Изменение</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredStocks.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="body1" color="text.secondary" sx={{ py: 2 }}>
                    Акции не найдены
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {filteredStocks.map(stock => (
                <StockRow
                    key={stock.symbol}
                    stock={stock}
                    onClick={() => { 
                        setSelectedPrice(stock.currentPrice); 
                        setSelectedSymbol(stock.symbol);
                    }}
                />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <StockChartModal
        symbol={selectedSymbol}
        currentPrice={selectedPrice}
        onClose={() => {
            setSelectedSymbol(null);
            setSelectedPrice(null);
        }}
      />
    </>
  );
}

export default StockTable;