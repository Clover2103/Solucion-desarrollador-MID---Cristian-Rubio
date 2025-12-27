import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoGeografia } from './mantenimiento-geografia';

describe('MantenimientoGeografia', () => {
  let component: MantenimientoGeografia;
  let fixture: ComponentFixture<MantenimientoGeografia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MantenimientoGeografia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenimientoGeografia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
