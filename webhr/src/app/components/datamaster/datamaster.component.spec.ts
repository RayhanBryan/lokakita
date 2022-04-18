import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatamasterComponent } from './datamaster.component';

describe('DatamasterComponent', () => {
  let component: DatamasterComponent;
  let fixture: ComponentFixture<DatamasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatamasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatamasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
