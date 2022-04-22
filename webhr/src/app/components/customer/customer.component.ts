import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class CustomerComponent implements OnInit {
  customer: any;
  first = 0;
  customerName: string = '';
  rows = 10;
  display: boolean = false;
  submitted: boolean = false;
  action: string = '';
  id: number = 0;
  showSearch: boolean = false;
  keyword: string = '';
  email: string = '';

  dataCustomer: any;
  row: any = {
    customerId: 0,
    customerName: '',
    email: '',
    phoneNumber: '',
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
        this.customer = data;
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
    return this.customer
      ? this.first === this.customer.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.customer ? this.first === 0 : true;
  }

  searchOption: string = 'customerName';
  searchOptions = [
    { label: 'All Categories', value: 'allCategories' },
    { label: 'Customer Name', value: 'customerName' },
    { label: 'Email', value: 'email' },
  ];
  search() {
    switch (this.searchOption) {
      case 'allCategories':
        this.findByAllCategories();
        break;
      case 'customerName':
        this.findByCustomerName();
        break;
      case 'email':
        this.findByEmail();
        break;
    }
  }

  findByAllCategories() {
    this.customerService.getAllCategories(this.keyword).subscribe((res) => {
      console.log(res);
      this.customer = res;
      if (res.length==0){
        this.messageService.add({
          severity: 'warn',
          summary: 'No result',
          detail: 'The search key was not found in any record!',
        });
      }
    });
  }

  findByCustomerName() {
    this.customerService.getCustomerName(this.keyword).subscribe((res) => {
      console.log(res);
      this.customer = res;
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
    this.customerService.getCustomerEmail(this.keyword).subscribe((res) => {
      console.log(res);
      this.customer = res;
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

  handleSaveCustomer(event: any) {
    this.submitted = true;
    if (this.handleValidation()){
      return;
    }
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        if (this.row.customerId === 0) {
          this.row.customerId = null;
          this.customerService.postCustomer(this.row).subscribe({
            next: (data) => { console.log(data);
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
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Could not add a new record',
              });
            },
          });
        } else {
          this.customerService.putCustomer(this.row).subscribe({
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
    if (this.row.customerName.length == 0 ||
        this.row.email.length == 0 ||
        this.row.phoneNumber.length == 0 ) {
      return true;
    }
    else {
      return false;
    }
  }


  handleReset(event: any, param: string): void {
    this.row = {
      customerId: (this.action == 'edit' && param == 'click') ? this.row.customerId : 0,
      customerName: '',
      email: '',
      phoneNumber: '',
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

  showSearchCall() {
    this.showSearch = !this.showSearch;
  }

}
