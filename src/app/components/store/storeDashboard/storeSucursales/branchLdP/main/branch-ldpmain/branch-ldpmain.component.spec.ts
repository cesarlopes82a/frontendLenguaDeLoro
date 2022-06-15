import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchLDPmainComponent } from './branch-ldpmain.component';

describe('BranchLDPmainComponent', () => {
  let component: BranchLDPmainComponent;
  let fixture: ComponentFixture<BranchLDPmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchLDPmainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchLDPmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
