import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBranchLDPComponent } from './new-branch-ldp.component';

describe('NewBranchLDPComponent', () => {
  let component: NewBranchLDPComponent;
  let fixture: ComponentFixture<NewBranchLDPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBranchLDPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBranchLDPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
