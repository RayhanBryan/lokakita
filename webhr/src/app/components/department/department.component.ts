import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import { LocationService } from 'src/app/services/location.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { MenuComponent } from '../menu/menu.component';

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
  showSearch: boolean = false;
  keyword: string = '';

  isView: boolean = false;
  isManage: boolean = false;


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
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.getCity();
    this.getManager();
    this.getDepartment();
    this.isView = Boolean(localStorage.getItem('isView'));
    this.isManage = Boolean(localStorage.getItem('isManage'));
  }

  ngAfterViewInit(): void {
    if (this.isView == false) {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Warn', detail: 'Sorry you dont have permission to view data', sticky: true });
    }
  }

  getDepartment() {
    this.departmentService.getDepartment().subscribe({
      next: (data) => {
        console.log(data);
        this.departments = data;
        this.departments.forEach((element: any) => {
          element.managerName =
            element.managerFirstName + '' + element.managerLastName;
        })
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
    if (this.departments != null) {
      if (this.departments.length < this.rows) {
        return true;
      }
      else {
        return (this.departments.length - this.first <= this.rows);
      }
    }
    return true;
  }

  isFirstPage(): boolean {
    return this.departments ? this.first === 0 : true;
  }

  searchOption: string = 'allCategories';
  searchOptions = [
    { label: 'All Categories', value: 'allCategories' },
    { label: 'Department Name', value: 'departmentName' },
    { label: 'Street Address', value: 'streetAddress' },
    { label: 'City', value: 'city' },
  ];
  search() {
    switch (this.searchOption) {
      case 'allCategories':
        this.findByAllCategories();
        break;
      case 'departmentName':
        this.findByDepartmentName();
        break;
      case 'city':
        this.findByCity();
        break;
      case 'streetAddress':
        this.findByStreetAddress();
        break;
    }
  }

  findByAllCategories() {
    this.departmentService.getAllCategories(this.keyword).subscribe((res) => {
      console.log(res);
      this.departments = res;
      if (res.length == 0) {
        this.messageService.add({
          severity: 'warn',
          summary: 'No result',
          detail: 'The search key was not found in any record!',
        });
      }
    });
  }

  findByDepartmentName() {
    this.departmentService.getDepartmentName(this.keyword).subscribe((res) => {
      console.log(res);
      this.departments = res;
      if (res.length == 0) {
        this.messageService.add({
          severity: 'warn',
          summary: 'No result',
          detail: 'The search key was not found in any record!',
        });
      }
    });
  }

  findByCity() {
    this.departmentService.getDepartmentByCity(this.keyword).subscribe((res) => {
      console.log(res);
      this.departments = res;
      if (res.length == 0) {
        this.messageService.add({
          severity: 'warn',
          summary: 'No result',
          detail: 'The search key was not found in any record!',
        });
      }
    });
  }

  findByStreetAddress() {
    this.departmentService.getDepartmentByStreetAddress(this.keyword).subscribe((res) => {
      console.log(res);
      this.departments = res;
      if (res.length == 0) {
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

  handleSaveDepartment(event: any) {
    this.submitted = true;
    if (this.handleValidation()) {
      return;
    }
    this.confirmationService.confirm({
      header: 'Confirmation',
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
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Could not add a new record',
              });
            },
          });
        } else {
          this.departmentService.putDepartment(this.row).subscribe({
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

  handleValidation() {
    let err = 0;
    if (this.row.departmentName.length == 0 ||
      this.row.managerId == null ||
      this.row.locationId.length == 0) {
      return true;
    }
    else {
      return false;
    }
  }

  handleReset(event: any, param: string): void {
    this.row = {
      departmentId: (this.action == 'edit' && param == 'click') ? this.row.departmentId : 0,
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

  showSearchCall() {
    this.showSearch = !this.showSearch;
  }
}
