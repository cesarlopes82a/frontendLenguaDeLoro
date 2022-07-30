import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadistSucursalComponent } from './estadist-sucursal.component';

describe('EstadistSucursalComponent', () => {
  let component: EstadistSucursalComponent;
  let fixture: ComponentFixture<EstadistSucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadistSucursalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadistSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
