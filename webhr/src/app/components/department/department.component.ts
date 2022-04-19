import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import { LocationService } from 'src/app/services/location.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class DepartmentComponent implements OnInit {
  departments: any;
  locations: any;
  employees: any;
  first = 0;
  departmentName: string = '';
  rows = 10;
  display: boolean = false;
  submitted: boolean = false;
  action: string = '';
  id: number = 0;
  showSearch:boolean = false;

  dataDepartment: any;
  row: any = {
    departmentId: 0,
    departmentName: '',
    managerId: 0,
    locationId: 0,
  };

  constructor(
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private locationService: LocationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getCity();
    this.getManager();
    this.getDepartment();
  }

  getDepartment() {
    this.departmentService.getDepartment().subscribe({
      next: (data) => {
        console.log(data);
        this.departments = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.departments
      ? this.first === this.departments.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.departments ? this.first === 0 : true;
  }

  findByDepartmentName() {
    this.departmentService
      .getDepartmentName(this.departmentName)
      .subscribe((res) => {
        console.log(res);
        this.departments = res;
      });
  }
  showDialog(action: string) {
    this.display = true;
    this.action = action;
  }

  handleDelete(value: Event) {
    this.confirmationService.confirm({
      target: value.target ? value.target : undefined,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.departmentService.deleteDepartment(value).subscribe((res) => {
          console.log(res);
          this.getDepartment();
          this.messageService.add({
            severity: 'Success',
            summary: 'Delete',
            detail: 'Data has been deleted',
          });
        });
      },
      reject: () => {
        //reject action
      },
    });
  }

  handleSaveDepartment(event: any) {
    this.submitted = true;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        if (this.row.departmentId === 0) {
          this.row.departmentId = null;
          this.departmentService.postDepartment(this.row).subscribe({
            next: (data) => {
              console.log(data);
              if (data.status) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Input',
                  detail: 'Data has been inserted',
                });
                this.getDepartment();
                this.display = false;
              }
            },
            error: (err) => {
              console.log('error cuy');
            },
          });
        } else {
          console.log('b');
          this.departmentService.putDepartment(this.row).subscribe({
            next: (data) => {
              console.log(data);
              if (data.status) {
                this.getDepartment();
                this.display = false;
              }
            },
            error: (err) => {
              console.log('error cuy');
            },
          });
        }
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Input Failed',
        });
      },
    });
  }

  handleValidation() {
    let err = 0;
    if (this.row.departmentName.length < 1) {
      err++;
    }
    if (err == 0) {
      return true;
    } else {
      return false;
    }
  }

  handleReset(event: any): void {
    this.row = {
      departmentId: 0,
      departmentName: '',
      managerId: 0,
      locationId: 0,
    };
  }

  openEdit(row: any) {
    this.row = { ...row };
    this.display = true;
    this.action = 'edit';
  }
  getCity(): void {
    this.locationService.getLocation().subscribe((res) => {
      this.locations = res.data;
    });
  }

  getManager(): void {
    this.employeeService.getEmployee().subscribe((res: any) => {
      this.employees = res.data;
    });
  }
  clear() {
    this.messageService.clear();
  }

  showSearchCall(){
    this.showSearch =!this.showSearch;
  }
}
