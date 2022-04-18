import { TestBed } from '@angular/core/testing';

import { GroupMenuService } from './group-menu.service';

describe('GroupMenuService', () => {
  let service: GroupMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
