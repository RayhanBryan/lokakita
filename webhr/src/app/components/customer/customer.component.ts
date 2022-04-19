import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
// import { LocationService } from 'src/app/services/location.service';
// import { EmployeeService } from 'src/app/services/employee.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class CustomerComponent implements OnInit {
  customers : any;
  first = 0;
  name: string = '';
  rows = 10;
  display: boolean = false;
  submitted: boolean = false;
  action: string = '';
  id: number = 0;
  showSearch:boolean = false;

  dataCustomer: any;
  row: any = {
    id: 0,
    name: '',
    email: '',
    phoneNo: '',
  };

  constructor(
    private customerService: CustomerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer() {
    this.customerService.getCustomer().subscribe({
      next: (data) => {
        console.log(data);
        this.customers = data;
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
    return this.customers
      ? this.first === this.customers.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.customers ? this.first === 0 : true;
  }

  findByCustomerName() {
    this.customerService
      .getCustomerName(this.name)
      .subscribe((res) => {
        console.log(res);
        this.customers = res;
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
        this.customerService.deleteCustomer(value).subscribe((res) => {
          console.log(res);
          this.getCustomer();
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

  handleSaveCustomer(event: any) {
    this.submitted = true;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        if (this.row.Id === 0) {
          this.row.Id = null;
          this.customerService.postCustomer(this.row).subscribe({
            next: (data) => {
              console.log(data);
              if (data.status) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Input',
                  detail: 'Data has been inserted',
                });
                this.getCustomer();
                this.display = false;
              }
            },
            error: (err) => {
              console.log('error cuy');
            },
          });
        } else {
          console.log('b');
          this.customerService.putCustomer(this.row).subscribe({
            next: (data) => {
              console.log(data);
              if (data.status) {
                this.getCustomer();
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
    if (this.row.name.length < 1) {
      err++;
    }
    if (err == 0) {
      return true;
    } else {
      return false;
    }
  }

  handleReset(event: any, param: string): void {
    this.row = {
      id: (this.action == 'edit' && param == 'click') ? this.row.departmentId : 0,
      name: '',
      email: '',
      phoneNo: '',
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

  showSearchCall(){
    this.showSearch =!this.showSearch;
  }

}
