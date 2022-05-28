import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogventaComponent } from './dialogventa.component';

describe('DialogventaComponent', () => {
  let component: DialogventaComponent;
  let fixture: ComponentFixture<DialogventaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogventaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
