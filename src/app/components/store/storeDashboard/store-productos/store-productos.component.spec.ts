import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductosComponent } from './store-productos.component';

describe('StoreProductosComponent', () => {
  let component: StoreProductosComponent;
  let fixture: ComponentFixture<StoreProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
