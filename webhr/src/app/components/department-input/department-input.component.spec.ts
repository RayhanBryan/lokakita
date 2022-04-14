import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentInputComponent } from './department-input.component';

describe('DepartmentInputComponent', () => {
  let component: DepartmentInputComponent;
  let fixture: ComponentFixture<DepartmentInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
