import { TestBed } from '@angular/core/testing';

import { AddEditDetailsService } from './add-edit-details.service';

describe('AddEditDetailsService', () => {
  let service: AddEditDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddEditDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
