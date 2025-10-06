import { TestBed } from '@angular/core/testing';

import { EnvurlService } from './envurl.service';

describe('EnvurlService', () => {
  let service: EnvurlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvurlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
