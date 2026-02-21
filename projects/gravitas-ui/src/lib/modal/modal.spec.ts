import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Modal } from './modal';

@Component({
  standalone: true,
  imports: [Modal],
  template: `
    <gv-modal
      [open]="open"
      [title]="title"
      [subtitle]="subtitle"
      [closeOnBackdrop]="closeOnBackdrop"
      [closeOnEsc]="closeOnEsc"
      [loading]="loading"
      (openChange)="open = $event"
      (closed)="lastReason = $event"
    >
      <div class="body">Body</div>
      <div gvFooter>
        <button type="button" class="close-btn" (click)="open = false">Close</button>
      </div>
    </gv-modal>
  `,
})
class HostComponent {
  open = true;
  title = 'Title';
  subtitle = 'Subtitle';
  closeOnBackdrop = true;
  closeOnEsc = true;
  loading = false;
  lastReason: any = null;
}

describe('Modal (gv-modal)', () => {
  function getPanel(): HTMLElement | null {
    return document.querySelector('.gv-modal__panel');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
  });

  it('renders when open=true and disappears when open=false', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    expect(getPanel()).toBeTruthy();

    fixture.componentInstance.open = false;
    fixture.detectChanges();

    expect(getPanel()).toBeFalsy();
  });

  it('emits openChange=false when clicking backdrop (if enabled)', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    const backdrop = fixture.debugElement.query(By.css('.gv-modal__backdrop'));
    backdrop.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
    fixture.detectChanges();

    expect(fixture.componentInstance.open).toBe(false);
    expect(fixture.componentInstance.lastReason).toBe('backdrop');
  });

  it('does NOT close on backdrop when closeOnBackdrop=false', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.componentInstance.closeOnBackdrop = false;
    fixture.detectChanges();

    const backdrop = fixture.debugElement.query(By.css('.gv-modal__backdrop'));
    backdrop.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
    fixture.detectChanges();

    expect(fixture.componentInstance.open).toBe(true);
    expect(fixture.componentInstance.lastReason).toBe(null);
  });

  it('closes on Escape (if enabled)', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(fixture.componentInstance.open).toBe(false);
    expect(fixture.componentInstance.lastReason).toBe('esc');
  });

  it('locks body scroll while open', () => {
    const fixture = TestBed.createComponent(HostComponent);

    const before = document.body.style.overflow;
    fixture.detectChanges();

    expect(document.body.style.overflow).toBe('hidden');

    fixture.componentInstance.open = false;
    fixture.detectChanges();

    expect(document.body.style.overflow).toBe(before);
  });
});
