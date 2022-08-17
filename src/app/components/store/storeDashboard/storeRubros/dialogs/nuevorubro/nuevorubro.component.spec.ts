import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevorubroComponent } from './nuevorubro.component';

describe('NuevorubroComponent', () => {
  let component: NuevorubroComponent;
  let fixture: ComponentFixture<NuevorubroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevorubroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevorubroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
