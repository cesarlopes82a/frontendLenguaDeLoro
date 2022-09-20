import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialographvtasComponent } from './dialographvtas.component';

describe('DialographvtasComponent', () => {
  let component: DialographvtasComponent;
  let fixture: ComponentFixture<DialographvtasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialographvtasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialographvtasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
