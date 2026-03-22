export type ToastVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'dark';

export type ToastPosition =
  | 'top-end'
  | 'top-start'
  | 'top-center'
  | 'bottom-end'
  | 'bottom-start'
  | 'bottom-center';

export interface ToastOptions {
  id?: string;
  title?: string;
  message: string;

  variant?: ToastVariant;
  durationMs?: number; // 0 => sticky
  dismissible?: boolean;

  position?: ToastPosition;
  ariaLive?: 'polite' | 'assertive';
}

export interface ToastItem extends Required<Omit<ToastOptions, 'id'>> {
  id: string;
  createdAt: number;
}
