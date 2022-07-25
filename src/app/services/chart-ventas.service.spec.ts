import { TestBed } from '@angular/core/testing';

import { ChartVentasService } from './chart-ventas.service';

describe('ChartVentasService', () => {
  let service: ChartVentasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartVentasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
