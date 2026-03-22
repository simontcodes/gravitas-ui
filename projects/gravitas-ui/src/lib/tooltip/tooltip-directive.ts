import {
  ApplicationRef,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  Renderer2,
  booleanAttribute,
  createComponent,
  effect,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { GvTooltipPanelComponent, GvTooltipPlacement } from './tooltip-panel';

export type GvTooltipTrigger = 'hover' | 'focus' | 'click' | 'manual';

let nextTooltipId = 0;

@Directive({
  selector: '[gvTooltip]',
  standalone: true,
  exportAs: 'gvTooltip',
})
export class GvTooltipDirective implements OnDestroy {
  @Input('gvTooltip') text = '';
  @Input() gvTooltipPlacement: GvTooltipPlacement = 'top';
  @Input() gvTooltipTrigger: GvTooltipTrigger = 'hover';
  @Input({ transform: booleanAttribute }) gvTooltipDisabled = false;
  @Input() gvTooltipOffset = 10;
  @Input() gvTooltipMaxWidth = 240;

  private tooltipRef: ComponentRef<GvTooltipPanelComponent> | null = null;
  private removeScrollListener: (() => void) | null = null;
  private removeResizeListener: (() => void) | null = null;
  private removeDocumentClickListener: (() => void) | null = null;
  private readonly isOpen = signal(false);
  private readonly tooltipId = `gv-tooltip-${++nextTooltipId}`;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly appRef: ApplicationRef,
    private readonly renderer: Renderer2,
    private readonly ngZone: NgZone,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
    effect(() => {
      const host = this.elementRef.nativeElement;
      if (this.isOpen()) {
        this.renderer.setAttribute(host, 'aria-describedby', this.tooltipId);
      } else {
        this.renderer.removeAttribute(host, 'aria-describedby');
      }
    });
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.gvTooltipTrigger === 'hover') {
      this.show();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.gvTooltipTrigger === 'hover') {
      this.hide();
    }
  }

  @HostListener('focusin')
  onFocusIn(): void {
    if (this.gvTooltipTrigger === 'focus' || this.gvTooltipTrigger === 'hover') {
      this.show();
    }
  }

  @HostListener('focusout')
  onFocusOut(): void {
    if (this.gvTooltipTrigger === 'focus' || this.gvTooltipTrigger === 'hover') {
      this.hide();
    }
  }

  @HostListener('click', ['$event'])
  onHostClick(event: MouseEvent): void {
    if (this.gvTooltipTrigger !== 'click') {
      return;
    }

    event.stopPropagation();
    this.toggle();
  }

  @HostListener('keydown.escape')
  onEscape(): void {
    this.hide();
  }

  show(): void {
    if (this.gvTooltipDisabled || !this.text?.trim() || this.tooltipRef) {
      return;
    }

    this.tooltipRef = createComponent(GvTooltipPanelComponent, {
      environmentInjector: this.appRef.injector,
    });

    this.tooltipRef.instance.text = this.text;
    this.tooltipRef.instance.placement = this.gvTooltipPlacement;
    this.tooltipRef.instance.maxWidth = this.gvTooltipMaxWidth;

    this.appRef.attachView(this.tooltipRef.hostView);

    const tooltipEl = this.tooltipRef.location.nativeElement as HTMLElement;
    tooltipEl.id = this.tooltipId;
    tooltipEl.setAttribute('role', 'tooltip');

    this.document.body.appendChild(tooltipEl);

    this.positionTooltip();
    this.bindGlobalListeners();
    this.isOpen.set(true);
  }

  hide(): void {
    if (!this.tooltipRef) {
      return;
    }

    this.unbindGlobalListeners();
    this.appRef.detachView(this.tooltipRef.hostView);
    this.tooltipRef.destroy();
    this.tooltipRef = null;
    this.isOpen.set(false);
  }

  toggle(): void {
    if (this.tooltipRef) {
      this.hide();
      return;
    }

    this.show();
  }

  ngOnDestroy(): void {
    this.hide();
  }

  private bindGlobalListeners(): void {
    this.ngZone.runOutsideAngular(() => {
      this.removeScrollListener = this.renderer.listen('window', 'scroll', () =>
        this.positionTooltip(),
      );

      this.removeResizeListener = this.renderer.listen('window', 'resize', () =>
        this.positionTooltip(),
      );

      if (this.gvTooltipTrigger === 'click') {
        this.removeDocumentClickListener = this.renderer.listen(
          this.document,
          'click',
          (event: MouseEvent) => {
            const host = this.elementRef.nativeElement;
            const tooltipEl = this.tooltipRef?.location.nativeElement as HTMLElement | undefined;
            const target = event.target as Node | null;

            if (!target) {
              return;
            }

            const clickedHost = host.contains(target);
            const clickedTooltip = tooltipEl?.contains(target);

            if (!clickedHost && !clickedTooltip) {
              this.hide();
            }
          },
        );
      }
    });
  }

  private unbindGlobalListeners(): void {
    this.removeScrollListener?.();
    this.removeResizeListener?.();
    this.removeDocumentClickListener?.();

    this.removeScrollListener = null;
    this.removeResizeListener = null;
    this.removeDocumentClickListener = null;
  }

  private positionTooltip(): void {
    if (!this.tooltipRef) {
      return;
    }

    const host = this.elementRef.nativeElement;
    const tooltipEl = this.tooltipRef.location.nativeElement as HTMLElement;

    const hostRect = host.getBoundingClientRect();

    tooltipEl.style.top = '0px';
    tooltipEl.style.left = '0px';

    const tooltipRect = tooltipEl.getBoundingClientRect();
    const offset = this.gvTooltipOffset;

    let top = 0;
    let left = 0;

    switch (this.gvTooltipPlacement) {
      case 'bottom':
        top = hostRect.bottom + offset;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;

      case 'left':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.left - tooltipRect.width - offset;
        break;

      case 'right':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.right + offset;
        break;

      case 'top':
      default:
        top = hostRect.top - tooltipRect.height - offset;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
    }

    const viewportPadding = 8;

    left = Math.max(
      viewportPadding,
      Math.min(left, window.innerWidth - tooltipRect.width - viewportPadding),
    );

    top = Math.max(
      viewportPadding,
      Math.min(top, window.innerHeight - tooltipRect.height - viewportPadding),
    );

    tooltipEl.style.top = `${Math.round(top)}px`;
    tooltipEl.style.left = `${Math.round(left)}px`;
  }
}
