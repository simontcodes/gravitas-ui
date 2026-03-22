import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type GvDropdownAlign = 'start' | 'end';

@Directive({
  selector: '[gvDropdownTrigger]',
  standalone: true,
})
export class DropdownTriggerDirective {}

@Directive({
  selector: '[gvDropdownMenu]',
  standalone: true,
})
export class DropdownMenuDirective {}

@Component({
  selector: 'gv-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dropdown {
  @Input() align: GvDropdownAlign = 'start';
  @Input() disabled = false;
  @Input() closeOnItemClick = true;

  @HostBinding('class.gv-dropdown')
  protected readonly baseClass = true;

  @HostBinding('class.gv-dropdown--open')
  get openClass(): boolean {
    return this.open;
  }

  @HostBinding('class.gv-dropdown--disabled')
  get disabledClass(): boolean {
    return this.disabled;
  }

  @HostBinding('class.gv-dropdown--align-end')
  get alignEndClass(): boolean {
    return this.align === 'end';
  }

  open = false;

  constructor(
    private readonly hostRef: ElementRef<HTMLElement>,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  toggle(event?: Event): void {
    event?.stopPropagation();

    if (this.disabled) {
      return;
    }

    this.open = !this.open;
    this.cdr.markForCheck();
  }

  closeMenu(): void {
    if (!this.open) {
      return;
    }

    this.open = false;
    this.cdr.markForCheck();
  }

  onTriggerKeydown(event: KeyboardEvent): void {
    if (this.disabled) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle(event);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.open = true;
      this.cdr.markForCheck();
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeMenu();
    }
  }

  onMenuClick(event: MouseEvent): void {
    event.stopPropagation();

    if (!this.closeOnItemClick) {
      return;
    }

    const target = event.target as HTMLElement | null;
    const actionable = target?.closest('button, a, [role="menuitem"]');

    if (actionable) {
      this.closeMenu();
    }
  }

  onMenuKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeMenu();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.open) {
      return;
    }

    const host = this.hostRef.nativeElement;
    const target = event.target as Node | null;

    if (target && !host.contains(target)) {
      this.closeMenu();
    }
  }
}
