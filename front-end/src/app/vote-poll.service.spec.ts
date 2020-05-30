import { TestBed } from '@angular/core/testing';

import { VotePollService } from './vote-poll.service';

describe('VotePollService', () => {
  let service: VotePollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VotePollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
