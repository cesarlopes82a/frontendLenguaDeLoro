import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadistTiendaComponent } from './estadist-tienda.component';

describe('EstadistTiendaComponent', () => {
  let component: EstadistTiendaComponent;
  let fixture: ComponentFixture<EstadistTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadistTiendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadistTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
