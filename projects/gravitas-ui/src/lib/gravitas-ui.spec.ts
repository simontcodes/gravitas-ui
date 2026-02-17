import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GravitasUi } from './gravitas-ui';

describe('GravitasUi', () => {
  let component: GravitasUi;
  let fixture: ComponentFixture<GravitasUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GravitasUi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GravitasUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
