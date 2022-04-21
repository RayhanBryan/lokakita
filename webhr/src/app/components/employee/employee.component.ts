import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog/dialogservice';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { JobHistoryService } from 'src/app/services/job-history.service';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class EmployeeComponent implements OnInit {
  departments: any;
  jobs: any;
  employees: any;
  managers: any;
  bonus: any;
  first = 0;
  rows = 10;
  display: boolean = false;
  showSearch: boolean = false;
  displaySalary: boolean = false;
  displayJobHistory: boolean = false;
  
  submitted: boolean = false;
  action: string = '';
  id: number = 0;
  dataEmployee: any;
  keyword: string = '';
  displayForm: boolean = false;

  row: any = {
    employeeId: 0,
    firstName: '',
    lastName: '',
    employeeName: '',
    email: '',
    phoneNumber: '',
    hireDate: '',
    jobId: '',
    salary: 0,
    commissionPct: 0,
    managerId: 0,
    departmentId: 0,
    managerName:'',
    // manager: '',
  };

  constructor(
    private confirmationService: ConfirmationService,
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private departmentService: DepartmentService,
    private jobService: JobService,
    private jobHistoryService: JobHistoryService
  ) {}

  ngOnInit(): void {
    this.getEmployee();
    this.getDepartment();
    this.getJob();
  }

  removeDuplicates(arr: any[]) {
    return arr.filter((item: any, index: any) => arr.indexOf(item) === index);
  }

  getEmployee() {
    this.employeeService.getEmployee().subscribe((res) => {
      this.employees = res.data;
      this.employees.forEach((element: any) => {
        element.manager =
          element.managerFirstName + ' ' + element.managerLastName;
        console.log(element);
        element.employeeName = element.firstName + ' ' +element.lastName;
      });
      // this.managers=this.removeDuplicates(this.employees);
      // console.log(this.managers);
    });
  }

  searchOption: string = 'fullName';
  searchOptions = [
    // { label: 'Search', value: 'searchByAll' },
    { label: 'Employee Name', value: 'fullName' },
    { label: 'Email', value: 'email' },
    { label: 'Job', value: 'jobTitle' },
    { label: 'Manager Name', value: 'manager' },
    { label: 'Department Name', value: 'departmentName' },
  ];
  search() {
    switch (this.searchOption) {
      case 'searchByAll':
        this.findByAll();
        break;
      case 'email':
        this.findByEmail();
        break;
      case 'fullName':
        this.findByEmployeeName();
        break;
      case 'jobTitle':
        this.findByJob();
        break;
      case 'manager':
        this.findByManagerName();
        break;
      case 'departmentName':
        this.findByDeptName();
        break;
    }
  }

  findByAll() {
    this.employeeService.getEmployeeByAll(this.keyword).subscribe((res) => {
      console.log(res);
      this.employees = res;
      if (res.length==0){
        this.messageService.add({
          severity: 'warn',
          summary: 'No result',
          detail: 'The search key was not found in any record!',
        });
      }
    });
  }

  findByEmail() {
    this.employeeService.getEmployeebyEmail(this.keyword).subscribe((res) => {
      console.log(res);
      this.employees = res;
      if (res.length==0){
        this.messageService.add({
          severity: 'warn',
          summary: 'No result',
          detail: 'The search key was not found in any record!',
        });
      }
    });
  }

  findByEmployeeName() {
    this.employeeService.getEmployeeName(this.keyword).subscribe((res) => {
      console.log(res);
      this.employees = res;
      if (res.length==0){
        this.messageService.add({
          severity: 'warn',
          summary: 'No result',
          detail: 'The search key was not found in any record!',
        });
      }
    });
  }

  findByJob() {
    this.employeeService.getEmployeebyJobTitle(this.keyword).subscribe((res) => {
      console.log(res);
      this.employees = res;
      if (res.length==0){
        this.messageService.add({
          severity: 'warn',
          summary: 'No result',
          detail: 'The search key was not found in any record!',
        });
      }
    });
  }

  findByManagerName() {
    this.employeeService.getEmployeeByManagerName(this.keyword).subscribe((res) => {
      console.log(res);
      this.employees = res;
      if (res.length==0){
        this.messageService.add({
          severity: 'warn',
          summary: 'No result',
          detail: 'The search key was not found in any record!',
        });
      }
    });
  }

  findByDeptName() {
    this.employeeService.getEmployeeByDepartmentName(this.keyword).subscribe((res) => {
      console.log(res);
      this.employees = res;
      if (res.length==0){
        this.messageService.add({
          severity: 'warn',
          summary: 'No result',
          detail: 'The search key was not found in any record!',
        });
      }
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
          this.getEmployee();
          this.messageService.add({
            severity: 'success',
            summary: 'Delete',
            detail: 'Data has been deleted',
          });
        });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'info',
              summary: 'Cancelled',
              detail: 'Your data is safe',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'info',
              summary: 'Cancelled',
              detail: 'Your data is safe',
            });
            break;
        }
      },
    });
  }

  handleValidation() {
    if (this.row.firstName.length == 0 ||
      this.row.lastName.length == 0 ||
      this.row.email.length == 0 ||
      this.row.phoneNumber == null ||
      this.row.jobId.length == 0 ||
      this.row.managerId == null ||
      this.row.departmentId == 0 ||
      this.row.salary <= 0 ||
      this.row.hireDate == null) {
      return true;
    }
    else {
      return false;
    }
  }

  handleSaveEmployee(event: any) {
    this.submitted = true;
    if (this.handleValidation()){
      return;
    }

    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        if (this.row.employeeId === 0) {
          this.row.employeeId = null;
          this.employeeService.postEmployee(this.row).subscribe({
            next: (data) => { console.log(data);
              if (data.status) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Input',
                  detail: 'Data has been inserted',
                });
                this.getEmployee();
                this.display = false;
              }
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Could not add a new record',
              });
            },
          });
        } else {
          this.employeeService.putEmployee(this.row).subscribe({
            next: (data) => {
              console.log(data);
              if (data.status) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Input',
                  detail: 'Data has been updated',
                });
                this.getEmployee();
                this.display = false;
              }
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Could not update a new record',
              });
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

  handleReset(event: any,  param: string): void {
    this.row = {
      employeeId: (this.action == 'edit' && param == 'click') ? this.row.employeeId : 0,
      firstName: '',
      lastName: '',
      fullName: '',
      email: '',
      phoneNumber: '',
      hireDate: '',
      jobId: '',
      salary: 0,
      commission: 0,
      managerId: 0,
      departmentId: 0,
      manager: '',
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
    this.departmentService.getDepartment().subscribe((res) => {
      this.departments = res;
    });
  }

  getJob(): void {
    this.jobService.getJob().subscribe((res) => {
      this.jobs = res.data;
    });
  }

  onChanged(nama: string) {
    this.employeeService.getEmployeeName(nama).subscribe((res) => {
      this.employees = res.data;
      console.log(this.employees);
    });
  }
  showSearchCall() {
    this.showSearch = !this.showSearch;
  }

  salary = [this.row];
  showBonus(row: any) {
    this.row = { ...row };
    this.displaySalary = true;
    this.employeeService.getEmployeeById(row.employeeId).subscribe((res) => {
      console.log(res.data);
      this.salary[0] = res.data;
      // this.ssss = res.data;
      // this.s=[res.data];
    });
  }


  jobHistory: any;

  showJobHistory(row: any){
    this.row = { ...row };
    this.displayJobHistory = true;
    this.jobHistoryService.getJobHistoryByEmployeeId(row.employeeId).subscribe(
      {
        next: (data)=>{
          
          this.jobHistory=data
          console.log(data)
            //this.onReset();
        },
        error: (err) => {
          console.log('error')
        }
      }
    )
  }
}
