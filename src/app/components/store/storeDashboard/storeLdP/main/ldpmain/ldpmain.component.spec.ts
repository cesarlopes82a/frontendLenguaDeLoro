import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LDPmainComponent } from './ldpmain.component';

describe('LDPmainComponent', () => {
  let component: LDPmainComponent;
  let fixture: ComponentFixture<LDPmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LDPmainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LDPmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
