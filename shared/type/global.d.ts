const TYPE = {
  ERROR: 'error',
  WARNING: 'warning',
  CONFIRM: 'confirm',
} as const;

export type Type = typeof TYPE[keyof typeof TYPE];
