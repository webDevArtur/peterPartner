import { Container, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import image from '../assets/chart.png';

function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center'}}>
      <Typography variant="h3" component="h1" gutterBottom>
        Добро пожаловать в Биржевой монитор!
      </Typography>
            
      <Box
        component="img"
        src={image}
        alt="chart"
        sx={{ width: '40%', maxHeight: 250, objectFit: 'cover', mb: 4, borderRadius: 2 }}
      />

      <Typography variant="h6" component="p" sx={{ mb: 4 }}>
        Отслеживайте актуальные котировки акций в реальном времени.
      </Typography>

      <Button
        variant="contained"
        size="large"
        component={RouterLink}
        to="/stocks"
        sx={{ backgroundColor: '#123456' }}
      >
        Перейти к таблице акций
      </Button>
    </Container>
  );
}

export default HomePage;
