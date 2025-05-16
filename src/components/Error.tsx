import { Box, Button, Alert } from '@mui/material';

interface ErrorProps {
    message: string;
    onRetry: () => void;
}

function Error({ message, onRetry }: ErrorProps) {
  return (
      <Box textAlign="center" pt={4}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {message}
        </Alert>
        
        <Button variant="contained" onClick={onRetry}>
          Попробовать снова
        </Button>
      </Box>
  );
}

export default Error;
