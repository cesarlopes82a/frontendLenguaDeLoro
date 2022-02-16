import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreLdPComponent } from './store-ld-p.component';

describe('StoreLdPComponent', () => {
  let component: StoreLdPComponent;
  let fixture: ComponentFixture<StoreLdPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreLdPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreLdPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
