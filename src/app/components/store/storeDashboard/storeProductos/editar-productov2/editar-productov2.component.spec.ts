import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProductov2Component } from './editar-productov2.component';

describe('EditarProductov2Component', () => {
  let component: EditarProductov2Component;
  let fixture: ComponentFixture<EditarProductov2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarProductov2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarProductov2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
