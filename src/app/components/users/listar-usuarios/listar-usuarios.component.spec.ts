import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarUsuariosGlobalComponent } from './listar-usuarios.component';

describe('ListarUsuariosComponent', () => {
  let component: ListarUsuariosGlobalComponent;
  let fixture: ComponentFixture<ListarUsuariosGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarUsuariosGlobalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarUsuariosGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
