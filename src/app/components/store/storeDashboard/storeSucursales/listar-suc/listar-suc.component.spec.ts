import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSucComponent } from './listar-suc.component';

describe('ListarSucComponent', () => {
  let component: ListarSucComponent;
  let fixture: ComponentFixture<ListarSucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarSucComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
