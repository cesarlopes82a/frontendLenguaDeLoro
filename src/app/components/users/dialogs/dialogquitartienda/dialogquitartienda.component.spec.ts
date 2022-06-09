import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogquitartiendaComponent } from './dialogquitartienda.component';

describe('DialogquitartiendaComponent', () => {
  let component: DialogquitartiendaComponent;
  let fixture: ComponentFixture<DialogquitartiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogquitartiendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogquitartiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
