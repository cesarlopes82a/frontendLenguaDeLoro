import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreSucursalesComponent } from './store-sucursales.component';

describe('StoreSucursalesComponent', () => {
  let component: StoreSucursalesComponent;
  let fixture: ComponentFixture<StoreSucursalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreSucursalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreSucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
