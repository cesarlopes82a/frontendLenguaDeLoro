import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarLdPComponent } from './listar-ld-p.component';

describe('ListarLdPComponent', () => {
  let component: ListarLdPComponent;
  let fixture: ComponentFixture<ListarLdPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarLdPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarLdPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
