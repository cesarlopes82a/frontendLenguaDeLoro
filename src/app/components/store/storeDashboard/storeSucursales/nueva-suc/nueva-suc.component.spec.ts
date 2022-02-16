import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaSucComponent } from './nueva-suc.component';

describe('NuevaSucComponent', () => {
  let component: NuevaSucComponent;
  let fixture: ComponentFixture<NuevaSucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaSucComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaSucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
