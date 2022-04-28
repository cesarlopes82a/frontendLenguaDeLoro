import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarVendedoresComponent } from './listar-vendedores.component';

describe('ListarVendedoresComponent', () => {
  let component: ListarVendedoresComponent;
  let fixture: ComponentFixture<ListarVendedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarVendedoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarVendedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
