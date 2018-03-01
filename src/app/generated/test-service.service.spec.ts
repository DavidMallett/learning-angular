import { TestBed, inject } from '@angular/core/testing';
import { expect, should } from 'chai';
import { TestServiceService } from './test-service.service';

describe('TestServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestServiceService]
    });
  });

  it('should be created', inject([TestServiceService], (service: TestServiceService) => {

    // tslint:disable-next-line:no-unused-expression
    expect(service);
  }));
});
