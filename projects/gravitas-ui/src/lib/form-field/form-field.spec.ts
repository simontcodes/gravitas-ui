import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormField } from './form-field';

@Component({
  standalone: true,
  imports: [FormField],
  template: `
    <gv-form-field
      [label]="label"
      [required]="required"
      [helperText]="helperText"
      [error]="error"
      [fullWidth]="fullWidth"
      [controlId]="controlId"
    >
      <span prefix class="prefix">P</span>
      <input class="form-control" [id]="controlId" />
      <span suffix class="suffix">S</span>
    </gv-form-field>
  `,
})
class HostComponent {
  label: string | null = 'Email';
  required = false;
  helperText: string | null = 'Helper';
  error: string | null = null;
  fullWidth = true;
  controlId = 'email';
}

describe('FormField (gv-form-field)', () => {
  async function setup() {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    return { fixture };
  }

  it('renders label with for=controlId', async () => {
    const { fixture } = await setup();
    const label = fixture.debugElement.query(By.css('label.gv-field__label'))
      .nativeElement as HTMLLabelElement;
    expect(label.textContent).toContain('Email');
    expect(label.getAttribute('for')).toBe('email');
  });

  it('shows required asterisk when required=true', async () => {
    const { fixture } = await setup();
    fixture.componentInstance.required = true;
    fixture.detectChanges();

    const star = fixture.debugElement.query(By.css('.gv-field__required'));
    expect(star).toBeTruthy();
  });

  it('shows helper text when no error', async () => {
    const { fixture } = await setup();
    const helper = fixture.debugElement.query(By.css('.gv-field__helper'))
      .nativeElement as HTMLElement;
    expect(helper.textContent).toContain('Helper');
  });

  it('shows error and hides helper when error is set', async () => {
    const { fixture } = await setup();
    fixture.componentInstance.error = 'Bad input';
    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css('.gv-field__error'))
      .nativeElement as HTMLElement;
    expect(error.textContent).toContain('Bad input');

    const helper = fixture.debugElement.query(By.css('.gv-field__helper'));
    expect(helper).toBeNull();
  });

  it('projects prefix and suffix slots', async () => {
    const { fixture } = await setup();

    expect(fixture.debugElement.query(By.css('.prefix'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.suffix'))).toBeTruthy();
  });
});
