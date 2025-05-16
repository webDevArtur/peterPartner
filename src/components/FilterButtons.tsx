import { Button, ButtonGroup } from '@mui/material';
import { FILTERS, FILTER_META } from '../constants/filters';
import type { FilterValue } from '../constants/filters';

interface FilterButtonsProps {
  selected: FilterValue;
  onChange: (filter: FilterValue) => void;
}

function FilterButtons({ selected, onChange }: FilterButtonsProps) {
  return (
    <ButtonGroup variant="outlined" aria-label="buttonGroup" sx={{ mb: 2 }}>
      {Object.values(FILTERS).map((filter) => (
        <Button
          key={filter}
          variant={selected === filter ? 'contained' : 'outlined'}
          color={FILTER_META[filter].color}
          onClick={() => onChange(filter)}
        >
          {FILTER_META[filter].label}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default FilterButtons;
