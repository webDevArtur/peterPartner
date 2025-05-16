import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Link as RouterLink } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#123456' }}>
      <Toolbar>
        <Button
          color="inherit"
          component={RouterLink}
          to="/"
          sx={{ display: 'flex', alignItems: 'center', textTransform: 'none' }}
        >
          <TrendingUpIcon fontSize="large" sx={{ mr: 1 }} />

          <Typography variant="h6" component="span">
            Биржевой монитор
          </Typography>
        </Button>

        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Главная
          </Button>
          
          <Button color="inherit" component={RouterLink} to="/stocks">
            Акции
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
