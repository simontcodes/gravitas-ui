import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Modal } from './modal';

describe('Modal (gv-modal)', () => {
  let fixture: ComponentFixture<Modal>;
  let component: Modal;

  async function setInputs(inputs: Partial<Modal>) {
    for (const [key, value] of Object.entries(inputs)) {
      fixture.componentRef.setInput(key as keyof Modal, value as never);
    }
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  function getPanel(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.gv-modal__panel');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modal],
    }).compileComponents();

    fixture = TestBed.createComponent(Modal);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('renders when open=true and disappears when open=false', async () => {
    await setInputs({ open: true, title: 'Title', subtitle: 'Subtitle' });
    expect(getPanel()).toBeTruthy();

    await setInputs({ open: false });
    expect(getPanel()).toBeFalsy();
  });

  it('emits openChange=false when clicking backdrop (if enabled)', async () => {
    const openChanges: boolean[] = [];
    const closedReasons: string[] = [];
    component.openChange.subscribe((value) => openChanges.push(value));
    component.closed.subscribe((reason) => closedReasons.push(reason));

    await setInputs({ open: true, closeOnBackdrop: true });

    const backdrop = fixture.debugElement.query(By.css('.gv-modal__backdrop'));
    backdrop.triggerEventHandler('mousedown', new MouseEvent('mousedown'));

    expect(openChanges).toEqual([false]);
    expect(closedReasons).toEqual(['backdrop']);
  });

  it('does NOT close on backdrop when closeOnBackdrop=false', async () => {
    const openChanges: boolean[] = [];
    const closedReasons: string[] = [];
    component.openChange.subscribe((value) => openChanges.push(value));
    component.closed.subscribe((reason) => closedReasons.push(reason));

    await setInputs({ open: true, closeOnBackdrop: false });

    const backdrop = fixture.debugElement.query(By.css('.gv-modal__backdrop'));
    backdrop.triggerEventHandler('mousedown', new MouseEvent('mousedown'));

    expect(openChanges).toEqual([]);
    expect(closedReasons).toEqual([]);
  });

  it('closes on Escape (if enabled)', async () => {
    const openChanges: boolean[] = [];
    const closedReasons: string[] = [];
    component.openChange.subscribe((value) => openChanges.push(value));
    component.closed.subscribe((reason) => closedReasons.push(reason));

    await setInputs({ open: true, closeOnEsc: true });

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(openChanges).toEqual([false]);
    expect(closedReasons).toEqual(['esc']);
  });

  it('locks body scroll while open', async () => {
    const before = document.body.style.overflow;

    await setInputs({ open: true });
    expect(document.body.style.overflow).toBe('hidden');

    await setInputs({ open: false });
    expect(document.body.style.overflow).toBe(before);
  });
});
