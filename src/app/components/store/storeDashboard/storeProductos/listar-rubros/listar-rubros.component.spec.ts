import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRubrosComponent } from './listar-rubros.component';

describe('ListarRubrosComponent', () => {
  let component: ListarRubrosComponent;
  let fixture: ComponentFixture<ListarRubrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarRubrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarRubrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
