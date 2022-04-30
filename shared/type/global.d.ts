const ToastType = {
  ERROR: 'error',
  WARNING: 'warning',
  CONFIRM: 'confirm',
} as const;

export type ToastType = typeof TYPE[keyof typeof TYPE];
