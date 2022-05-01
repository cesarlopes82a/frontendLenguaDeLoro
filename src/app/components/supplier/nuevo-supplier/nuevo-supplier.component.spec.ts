import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoSupplierComponent } from './nuevo-supplier.component';

describe('NuevoSupplierComponent', () => {
  let component: NuevoSupplierComponent;
  let fixture: ComponentFixture<NuevoSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoSupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
