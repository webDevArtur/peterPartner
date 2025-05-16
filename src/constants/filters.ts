export const FILTERS = {
  ALL: 'all',
  GROWING: 'growing',
  FALLING: 'falling',
} as const;

export type FilterValue = typeof FILTERS[keyof typeof FILTERS];

export const FILTER_META: Record<FilterValue, { label: string; color?: 'success' | 'error' | 'primary' }> = {
  all: { label: 'Все', color: 'primary' },
  growing: { label: 'Растущие', color: 'success' },
  falling: { label: 'Падающие', color: 'error' },
};
