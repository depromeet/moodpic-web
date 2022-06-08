export const TAG_SEARCH_ORDER_TYPE = {
  NEWEST: 'newest',
  POPULARITY: 'Popularity',
} as const;

export type TagSearchOrderType = typeof TAG_SEARCH_ORDER_TYPE[keyof typeof TAG_SEARCH_ORDER_TYPE];
