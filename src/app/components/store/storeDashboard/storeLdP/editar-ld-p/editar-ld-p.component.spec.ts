import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarLdPComponent } from './editar-ld-p.component';

describe('EditarLdPComponent', () => {
  let component: EditarLdPComponent;
  let fixture: ComponentFixture<EditarLdPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarLdPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarLdPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
