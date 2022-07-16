import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogajusteComponent } from './dialogajuste.component';

describe('DialogajusteComponent', () => {
  let component: DialogajusteComponent;
  let fixture: ComponentFixture<DialogajusteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogajusteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogajusteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
