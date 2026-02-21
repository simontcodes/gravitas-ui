import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ToastService } from './toasts.service';
import { ToastItem, ToastPosition } from './toasts.service';

@Component({
  selector: 'gv-toasts',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, AsyncPipe],
  templateUrl: './toasts.html',
  styleUrl: './toasts.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toasts {
  private readonly toastSvc = inject(ToastService);
  readonly toasts$ = this.toastSvc.toasts$;

  dismiss(id: string) {
    this.toastSvc.dismiss(id);
  }

  trackById(_: number, t: ToastItem) {
    return t.id;
  }

  positionClass(pos: ToastPosition) {
    // one container per position is a v2 feature; for v1 we use per-toast class
    return `gv-toasts--${pos}`;
  }
}
