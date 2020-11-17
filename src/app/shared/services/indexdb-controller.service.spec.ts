import { TestBed } from '@angular/core/testing';

import { IndexdbControllerService } from './indexdb-controller.service';

describe('IndexdbControllerService', () => {
  let service: IndexdbControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexdbControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
