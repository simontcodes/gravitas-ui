import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Card } from './card';

@Component({
  standalone: true,
  imports: [Card],
  template: `
    <gv-card [title]="title" [subtitle]="subtitle">
      <div gvCardActions>Actions</div>
      Body Content
    </gv-card>
  `,
})
class Host {
  title = 'Title';
  subtitle = 'Subtitle';
}

describe('Card (gv-card)', () => {
  let fixture: ComponentFixture<Card>;

  async function setInputs(inputs: Partial<Card>) {
    for (const [k, v] of Object.entries(inputs)) {
      fixture.componentRef.setInput(k as any, v as any);
    }
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card, Host],
    }).compileComponents();

    fixture = TestBed.createComponent(Card);
    fixture.detectChanges();
  });

  it('renders base classes', async () => {
    await setInputs({ variant: 'default' as any, padding: 'md' as any });

    const el = fixture.debugElement.query(By.css('.gv-card'))?.nativeElement as HTMLElement;
    expect(el).toBeTruthy();
    expect(el.className).toContain('card');
    expect(el.className).toContain('gv-card--default');
    expect(el.className).toContain('gv-card--pad-md');
  });

  it('applies fullHeight as h-100 when fullHeight=true', async () => {
    await setInputs({ fullHeight: true as any });
    const el = fixture.debugElement.query(By.css('.gv-card'))?.nativeElement as HTMLElement;
    expect(el.className).toContain('h-100');
  });

  it('does not render header when no title/subtitle and showHeader is null', async () => {
    await setInputs({ title: '', subtitle: '', showHeader: null as any });

    const header = fixture.debugElement.query(By.css('.gv-card__header'));
    expect(header).toBeNull();
  });

  it('renders header when title exists', async () => {
    await setInputs({ title: 'Hello', subtitle: '' });
    const header = fixture.debugElement.query(By.css('.gv-card__header'));
    expect(header).toBeTruthy();
  });

  it('projects actions slot and body (projection)', async () => {
    const hostFixture = TestBed.createComponent(Host);
    hostFixture.detectChanges();
    await hostFixture.whenStable();
    hostFixture.detectChanges();

    const actions = hostFixture.debugElement.query(By.css('.gv-card__actions'))?.nativeElement as HTMLElement;
    expect((actions?.textContent ?? '').trim()).toContain('Actions');

    const body = hostFixture.debugElement.query(By.css('.gv-card__body'))?.nativeElement as HTMLElement;
    expect((body?.textContent ?? '').trim()).toContain('Body Content');
  });
});
