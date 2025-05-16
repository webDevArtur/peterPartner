import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import type { Stock } from '../types/stock';

interface StockRowProps {
  stock: Stock;
  onClick?: () => void;
}

const StockRow = React.memo(({ stock, onClick }: StockRowProps) => {
  const { symbol, currentPrice, openPrice, change, percentChange } = stock;

  const priceChangeColor =
    currentPrice !== null && openPrice !== null
      ? currentPrice > openPrice
        ? 'green'
        : currentPrice < openPrice
        ? 'red'
        : 'gray'
      : 'gray';

  return (
    <TableRow key={symbol} hover onClick={onClick} sx={{ cursor: 'pointer' }}>
      <TableCell component="th" scope="row" sx={{ fontFamily: 'monospace' }}>
        {symbol}
      </TableCell>

      <TableCell align="right">
        {currentPrice !== null ? currentPrice.toFixed(2) : '-'}
      </TableCell>

      <TableCell align="right">
        {openPrice !== null ? openPrice.toFixed(2) : '-'}
      </TableCell>

      <TableCell align="right" sx={{ color: priceChangeColor }}>
        {change !== null
          ? `${change.toFixed(2)} (${percentChange !== null ? percentChange.toFixed(2) + '%' : '-'})`
          : '-'}
      </TableCell>
    </TableRow>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.stock.currentPrice === nextProps.stock.currentPrice &&
    prevProps.stock.openPrice === nextProps.stock.openPrice &&
    prevProps.stock.change === nextProps.stock.change &&
    prevProps.stock.percentChange === nextProps.stock.percentChange
  );
});

export default StockRow;
