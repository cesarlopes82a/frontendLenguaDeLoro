import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSupplierComponent } from './editar-supplier.component';

describe('EditarSupplierComponent', () => {
  let component: EditarSupplierComponent;
  let fixture: ComponentFixture<EditarSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarSupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
