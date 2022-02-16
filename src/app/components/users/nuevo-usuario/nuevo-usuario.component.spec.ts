import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoUsuarioGlobalComponent } from './nuevo-usuario.component';

describe('NuevoUsuarioComponent', () => {
  let component: NuevoUsuarioGlobalComponent;
  let fixture: ComponentFixture<NuevoUsuarioGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoUsuarioGlobalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoUsuarioGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
