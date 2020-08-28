import { TestBed } from '@angular/core/testing';

import { AponMartFormService } from './apon-mart-form.service';

describe('AponMartFormService', () => {
  let service: AponMartFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AponMartFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
