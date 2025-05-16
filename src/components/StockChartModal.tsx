import { useEffect, useState } from 'react';
import { Modal, Box, Typography, Skeleton } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchStockHistory } from '../api/stockApi';

interface StockChartModalProps {
  symbol: string | null;
  currentPrice: number | null;
  onClose: () => void;
}

interface HistoryPoint {
  date: string;
  close: number;
}

function StockChartModal({ symbol, currentPrice, onClose }: StockChartModalProps) {
  const [data, setData] = useState<HistoryPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol || !currentPrice) return;

    setLoading(true);
    setError(null);
    fetchStockHistory(currentPrice)
      .then(setData)
      .catch(() => setError('Ошибка загрузки графика'))
      .finally(() => setLoading(false));
  }, [symbol, currentPrice]);

  return (
    <Modal open={Boolean(symbol)} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          width: '90%',
          maxWidth: 600,
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        <Typography variant="h6" gutterBottom>
          График цены акции: {symbol}
        </Typography>

        {loading && (
          <Skeleton variant="rectangular" width="100%" height={300} animation="wave" />
        )}

        {error && <Typography color="error">{error}</Typography>}

        {!loading && !error && data.length > 0 && (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="date" />

              <YAxis domain={['auto', 'auto']} />

              <Tooltip />
              
              <Line type="monotone" dataKey="close" stroke="#3f51b5" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Modal>
  );
}

export default StockChartModal;
