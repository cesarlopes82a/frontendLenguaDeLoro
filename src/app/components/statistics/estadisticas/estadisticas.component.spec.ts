import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasGlobalComponent } from './estadisticas.component';

describe('EstadisticasGlobalComponent', () => {
  let component: EstadisticasGlobalComponent;
  let fixture: ComponentFixture<EstadisticasGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticasGlobalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
