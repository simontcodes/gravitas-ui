import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastItem, ToastOptions, ToastPosition, ToastVariant } from './toast.model';

const DEFAULTS: Required<Omit<ToastOptions, 'id'>> = {
  title: '',
  message: '',
  variant: 'primary',
  durationMs: 3500,
  dismissible: true,
  position: 'top-end',
  ariaLive: 'polite',
};

function uid() {
  return `gv_${Math.random().toString(36).slice(2)}_${Date.now().toString(36)}`;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly _toasts$ = new BehaviorSubject<ToastItem[]>([]);
  readonly toasts$ = this._toasts$.asObservable();

  show(opts: ToastOptions): string {
    const id = opts.id ?? uid();
    const toast: ToastItem = {
      ...DEFAULTS,
      ...opts,
      id,
      createdAt: Date.now(),
      // message required
      message: opts.message,
      title: opts.title ?? DEFAULTS.title,
      variant: (opts.variant ?? DEFAULTS.variant) as ToastVariant,
      position: (opts.position ?? DEFAULTS.position) as ToastPosition,
      durationMs: opts.durationMs ?? DEFAULTS.durationMs,
      dismissible: opts.dismissible ?? DEFAULTS.dismissible,
      ariaLive: opts.ariaLive ?? DEFAULTS.ariaLive,
    };

    this._toasts$.next([toast, ...this._toasts$.value]);

    if (toast.durationMs > 0) {
      window.setTimeout(() => this.dismiss(id), toast.durationMs);
    }

    return id;
  }

  dismiss(id: string) {
    this._toasts$.next(this._toasts$.value.filter((t) => t.id !== id));
  }

  clear() {
    this._toasts$.next([]);
  }

  // Convenience helpers (enterprise apps use these a lot)
  success(message: string, title = 'Success') {
    return this.show({ variant: 'success', title, message });
  }

  error(message: string, title = 'Error') {
    return this.show({ variant: 'danger', title, message, ariaLive: 'assertive' });
  }

  warning(message: string, title = 'Warning') {
    return this.show({ variant: 'warning', title, message });
  }

  info(message: string, title = 'Info') {
    return this.show({ variant: 'info', title, message });
  }
}
export type { ToastItem, ToastPosition };

