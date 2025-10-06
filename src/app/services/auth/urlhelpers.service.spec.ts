import { TestBed } from '@angular/core/testing';

import { UrlhelpersService } from './urlhelpers.service';

describe('UrlhelpersService', () => {
  let service: UrlhelpersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlhelpersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
