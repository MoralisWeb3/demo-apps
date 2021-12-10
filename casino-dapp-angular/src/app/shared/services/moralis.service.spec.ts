import { TestBed } from '@angular/core/testing';

import { MoralisService } from './moralis.service';

describe('MoralisService', () => {
  let service: MoralisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoralisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
