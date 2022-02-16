import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSucComponent } from './editar-suc.component';

describe('EditarSucComponent', () => {
  let component: EditarSucComponent;
  let fixture: ComponentFixture<EditarSucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarSucComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
