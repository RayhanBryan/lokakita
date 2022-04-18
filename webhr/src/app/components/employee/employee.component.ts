import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class EmployeeComponent implements OnInit {
  departments: any;
  locations: any;
  employees: any;
  first = 0;
  rows = 10;
  display: boolean = false;

  submitted: boolean = false;
  action: string = '';
  id: number = 0;
  dataEmployee: any;
  firstName: string = '';
  displayForm: boolean = false;

  row: any = {
    employeeId: 0,
    firstName: '',
    email: '',
    phoneNumber: '',
    hireDate: '',
    jobId: '',
    salary: 0,
    commission: 0,
    managerId: 0,
    departmentId: 0,
  };


  constructor(private confirmationService: ConfirmationService,
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private departmentService: DepartmentService,
    private jobService: JobService) { }

  ngOnInit(): void {
    this.getEmployee();

  }

  getEmployee() {
    this.employeeService.getEmployee().subscribe(
      res => {
        console.log(res.data);
        this.employees = res.data;
      },
      //   error: (err) => {
      //     console.log(err);
      //   },
    );
  }

  findByEmployeeName() {
    this.employeeService.getEmployeeName(this.firstName).subscribe(
      res => {
        console.log(res);
        this.employees = res;
      });
  }

  showDialog(action: string) {
    this.display = true;
    this.action = action;
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
    return this.employees
      ? this.first === this.employees.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.employees ? this.first === 0 : true;
  }

  handleDelete(value: Event) {
    this.confirmationService.confirm({
      target: value.target ? value.target : undefined,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.employeeService.deleteEmployee(value).subscribe((res) => {
          console.log(res);
          this.getEmployee()
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
    console.log('b');
      this.confirmationService.confirm({
        header: 'Confirmation',
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        if (this.row.employeeId === 0) {
          this.row.employeeId = null;
          this.employeeService.postEmployee(this.row).subscribe({
            next: (data) => {
              console.log(data);
              if (data.status) {
                this.display = false;
                this.getEmployee();
                alert('Data berhasil diinput.')
                this.getEmployee();
                this.display = false;
              }
            },
            error: (err) => {
              console.log('error cuy');
            },
          });
        } else {
          console.log('b');
          this.employeeService.putEmployee(this.row).subscribe({
            next: (data) => {
              console.log(data);
              if (data.status) {
                this.getEmployee();
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
    if (this.row.employeeName.length < 1) {
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
      employeeId: 0,
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      hireDate: '',
      jobId: '',
      salary: 0,
      commission: 0,
      managerId: 0,
      departmentId: 0,
    };
  }

  openEdit(row: any) {
    this.row = { ...row };
    this.display = true;
    this.action = 'edit';
  }

  clear() {
    this.messageService.clear();
  }

  showForm() {
    this.displayForm = !this.displayForm;
  }

  getDepartment(): void {
    this.departmentService.getDepartment().subscribe(
      res => {
        this.locations = res;
      }
    )
  }

  getJob(): void {
    this.jobService.getJob().subscribe(
      res => {
        this.locations = res;
      }
    )
  }
}
