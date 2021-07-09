import { TestBed } from '@angular/core/testing';

import { GeolocationMapService } from './geolocation-map.service';

describe('GeolocationMapService', () => {
  let service: GeolocationMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeolocationMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
