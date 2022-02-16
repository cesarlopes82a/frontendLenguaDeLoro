import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoRubroComponent } from './nuevo-rubro.component';

describe('NuevoRubroComponent', () => {
  let component: NuevoRubroComponent;
  let fixture: ComponentFixture<NuevoRubroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoRubroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoRubroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
