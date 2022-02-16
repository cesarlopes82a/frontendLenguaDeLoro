import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaLdPComponent } from './nueva-ld-p.component';

describe('NuevaLdPComponent', () => {
  let component: NuevaLdPComponent;
  let fixture: ComponentFixture<NuevaLdPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaLdPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaLdPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
