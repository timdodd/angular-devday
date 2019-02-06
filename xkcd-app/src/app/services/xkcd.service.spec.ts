import { TestBed } from '@angular/core/testing';

import { XkcdService } from './xkcd.service';

describe('XkcdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XkcdService = TestBed.get(XkcdService);
    expect(service).toBeTruthy();
  });
});
