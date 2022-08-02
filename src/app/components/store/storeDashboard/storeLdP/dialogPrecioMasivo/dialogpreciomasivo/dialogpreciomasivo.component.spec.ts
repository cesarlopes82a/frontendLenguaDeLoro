import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogpreciomasivoComponent } from './dialogpreciomasivo.component';

describe('DialogpreciomasivoComponent', () => {
  let component: DialogpreciomasivoComponent;
  let fixture: ComponentFixture<DialogpreciomasivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogpreciomasivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogpreciomasivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
