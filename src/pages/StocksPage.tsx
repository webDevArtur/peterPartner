import { useState } from 'react';
import { Container, Typography, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useDebounce } from '../hooks/useDebounce';
import FilterButtons from '../components/FilterButtons';
import StockTable from '../components/StockTable';
import { FILTERS } from '../constants/filters';
import type { FilterValue } from '../constants/filters';


function StocksPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterValue>(FILTERS.ALL);

  const debouncedSearch = useDebounce(search, 300);

  const handleReset = () => {
    setSearch('');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Акции
      </Typography>

      <TextField
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Поиск по названию"
        variant="outlined"
        size="small"
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: search && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={handleReset} aria-label="Сбросить поиск и фильтр">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <FilterButtons selected={filter} onChange={setFilter} />

      <StockTable search={debouncedSearch} filter={filter} />
    </Container>
  );
}

export default StocksPage;
