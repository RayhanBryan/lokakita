import { TestBed } from '@angular/core/testing';

import { GroupmenuService } from './groupmenu.service';

describe('GroupmenuService', () => {
  let service: GroupmenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupmenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
