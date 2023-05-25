import { TestBed } from '@angular/core/testing';

import { MarketWatchService } from './market-watch.service';

describe('MarketWatchService', () => {
  let service: MarketWatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketWatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
