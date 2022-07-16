import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogpagosComponent } from './dialogpagos.component';

describe('DialogpagosComponent', () => {
  let component: DialogpagosComponent;
  let fixture: ComponentFixture<DialogpagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogpagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogpagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
