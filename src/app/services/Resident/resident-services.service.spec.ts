import { TestBed } from '@angular/core/testing';

import { ResidentServicesService } from './resident-services.service';

describe('ResidentServicesService', () => {
  let service: ResidentServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResidentServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
