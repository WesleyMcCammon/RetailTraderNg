import { TestBed } from '@angular/core/testing';

import { TcpMessageService } from './tcp-message.service';

describe('TcpMessageService', () => {
  let service: TcpMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TcpMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
