import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewldpComponent } from './newldp.component';

describe('NewldpComponent', () => {
  let component: NewldpComponent;
  let fixture: ComponentFixture<NewldpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewldpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewldpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
