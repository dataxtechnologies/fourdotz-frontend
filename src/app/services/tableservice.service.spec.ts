import { TestBed } from '@angular/core/testing';

import { TableService } from './tableservice.service';

describe('TableserviceService', () => {
  let service: TableService<T>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
