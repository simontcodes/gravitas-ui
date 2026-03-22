import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Button } from './button';

@Component({
  standalone: true,
  imports: [Button],
  template: `
    <gv-button [loading]="loading" [loadingText]="loadingText"> Default Label </gv-button>
  `,
})
class ProjectionHost {
  loading = false;
  loadingText = '';
}

describe('Button (gv-button)', () => {
  let fixture: ComponentFixture<Button>;

  function getBtn(): HTMLButtonElement {
    return fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
  }

  async function setInputs(inputs: Partial<Button>) {
    for (const [k, v] of Object.entries(inputs)) {
      fixture.componentRef.setInput(k as any, v as any);
    }
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button, ProjectionHost],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    fixture.detectChanges();
  });

  it('renders a button with base classes', async () => {
    await setInputs({ variant: 'primary', size: 'md' });

    const btn = getBtn();
    expect(btn.className).toContain('btn');
    expect(btn.className).toContain('gv-button');
    expect(btn.className).toContain('btn-primary');
  });

  it('applies variant class', async () => {
    await setInputs({ variant: 'danger' as any });

    const btn = getBtn();
    expect(btn.className).toContain('btn-danger');
  });

  it('applies size class (sm/lg) but not for md', async () => {
    await setInputs({ size: 'sm' as any });
    expect(getBtn().className).toContain('btn-sm');

    await setInputs({ size: 'lg' as any });
    expect(getBtn().className).toContain('btn-lg');

    await setInputs({ size: 'md' as any });
    expect(getBtn().className).not.toContain('btn-md');
  });

  it('applies fullWidth as w-100 when fullWidth=true', async () => {
    await setInputs({ fullWidth: true as any });
    expect(getBtn().className).toContain('w-100');
  });

  it('appends className utilities', async () => {
    await setInputs({ className: 'mt-3 px-4' as any });

    const cls = getBtn().className;
    expect(cls).toContain('mt-3');
    expect(cls).toContain('px-4');
  });

  it('sets button type attribute', async () => {
    await setInputs({ type: 'submit' as any });
    expect(getBtn().getAttribute('type')).toBe('submit');
  });

  it('disables the button when disabled=true', async () => {
    await setInputs({ disabled: true as any });

    const btn = getBtn();
    expect(btn.disabled).toBe(true);
    expect(btn.className).toContain('disabled');
  });

  it('disables the button when loading=true (and adds aria-busy)', async () => {
    await setInputs({ loading: true as any });

    const btn = getBtn();
    expect(btn.disabled).toBe(true);
    expect(btn.getAttribute('aria-busy')).toBe('true');
  });

  it('shows spinner when loading=true', async () => {
    await setInputs({ loading: true as any });

    const spinner = fixture.debugElement.query(By.css('.spinner-border'));
    expect(spinner).toBeTruthy();
  });

  it('does NOT show spinner when loading=false', async () => {
    await setInputs({ loading: false as any });

    const spinner = fixture.debugElement.query(By.css('.spinner-border'));
    expect(spinner).toBeNull();
  });

  it('shows loadingText when loading=true and loadingText is provided', async () => {
    await setInputs({ loading: true as any, loadingText: 'Saving...' as any });

    const labelEl = fixture.debugElement.query(By.css('.gv-btn-label'))?.nativeElement as
      | HTMLElement
      | undefined;
    const text = (labelEl?.textContent ?? '').trim();
    expect(text).toContain('Saving...');
  });

  it('shows default projected label when not loading (projection)', async () => {
    const hostFixture = TestBed.createComponent(ProjectionHost);

    hostFixture.componentInstance.loading = false;
    hostFixture.componentInstance.loadingText = 'Saving...';

    hostFixture.detectChanges();
    await hostFixture.whenStable();
    hostFixture.detectChanges();

    const labelEl = hostFixture.debugElement.query(By.css('.gv-btn-label'))
      ?.nativeElement as HTMLElement;
    const text = (labelEl?.textContent ?? '').trim();

    expect(text).toContain('Default Label');
    expect(text).not.toContain('Saving...');
  });

  it('falls back to normal projected content when loading=true but loadingText is empty (projection)', async () => {
    const hostFixture = TestBed.createComponent(ProjectionHost);

    hostFixture.componentInstance.loading = true;
    hostFixture.componentInstance.loadingText = '';

    hostFixture.detectChanges();
    await hostFixture.whenStable();
    hostFixture.detectChanges();

    const labelEl = hostFixture.debugElement.query(By.css('.gv-btn-label'))
      ?.nativeElement as HTMLElement;
    const text = (labelEl?.textContent ?? '').trim();

    expect(text).toContain('Default Label');
  });
});
