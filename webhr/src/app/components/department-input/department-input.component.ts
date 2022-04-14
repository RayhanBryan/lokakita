import { Component, OnInit } from '@angular/core';
import { DepartmentComponent } from '../department/department.component';
import { ChangeDetectorRef, AfterContentChecked} from '@angular/core';


@Component({
  selector: 'app-department-input',
  templateUrl: './department-input.component.html',
  styleUrls: ['./department-input.component.css']
})
export class DepartmentInputComponent implements OnInit {

  constructor(private deparmentComponent: DepartmentComponent, private cdref: ChangeDetectorRef) { }
  ngAfterContentChecked() {

    this.cdref.detectChanges();
  }

  ngOnInit(): void {
    this.deparmentComponent.show = false;
  }

}
