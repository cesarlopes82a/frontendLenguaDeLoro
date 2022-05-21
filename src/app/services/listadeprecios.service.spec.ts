import { TestBed } from '@angular/core/testing';

import { ListadepreciosService } from './listadeprecios.service';

describe('ListadepreciosService', () => {
  let service: ListadepreciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListadepreciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
