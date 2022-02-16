import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreUsuariosComponent } from './store-usuarios.component';

describe('StoreUsuariosComponent', () => {
  let component: StoreUsuariosComponent;
  let fixture: ComponentFixture<StoreUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
