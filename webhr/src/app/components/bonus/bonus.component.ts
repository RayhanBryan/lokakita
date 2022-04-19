import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BonusService } from 'src/app/services/bonus.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class BonusComponent implements OnInit {
  employees: any;
  bonus: any;
  first = 0;
  rows = 10;
  display: boolean = false;
  jobs: any;
  showSearch:boolean =false;

  submitted: boolean = false;
  action: string = '';
  id: number = 0;
  dataEmployee: any;
  firstName: string = '';
  displayForm: boolean = false;

  row: any = {
    employeeId: 0,
    firstName: '',
    lastName: '',
    jobId: '',
    salary: 0,
    commission: 0,
  };


  constructor(private confirmationService: ConfirmationService,
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private bonusService: BonusService,
    private jobService: JobService) { }

  ngOnInit(): void {
    this.getBonus();

  }

  getBonus() {
    this.bonusService.getBonus().subscribe(
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
    this.bonusService.getEmployeeName(this.firstName).subscribe(
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
    return this.bonus
      ? this.first === this.bonus.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.bonus ? this.first === 0 : true;
  }

  handleDelete(value: Event) {
    this.confirmationService.confirm({
      target: value.target ? value.target : undefined,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.bonusService.deleteBonus(value).subscribe((res) => {
          console.log(res);
          this.getBonus()
          this.messageService.add({
            severity: 'Success',
            summary: 'Delete',
            detail: 'Data has been deleted',
          });
        });
      },
      reject: () => {
        console.log('reject')
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
          this.bonusService.postBonus(this.row).subscribe({
            next: (data) => {
              console.log(data);
              if (data.status) {
                this.display = false;
                this.getBonus();
                alert('Data berhasil diinput.')
                this.getBonus();
                this.display = false;
              }
            },
            error: (err) => {
              console.log('error cuy');
            },
          });
        } else {
          console.log('b');
          this.bonusService.putBonus(this.row).subscribe({
            next: (data) => {
              console.log(data);
              if (data.status) {
                this.getBonus();
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
      jobId: '',
      salary: 0,
      commission: 0,
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

  getEmployee(): void {
    this.employeeService.getEmployee().subscribe(
      res => {
        this.employees = res;
      }
    )
  }

  getJob(): void {
    this.jobService.getJob().subscribe(
      res => {
        this.jobs = res;
      }
    )
  }

  onChanged(nama: string){
    this.employeeService.getEmployeeName(nama).subscribe(
      res => {
        this.employees = res.data;
        console.log(this.employees)
      }
    )
  }
  showSearchCall(){
    this.showSearch = !this.showSearch;
  }
}
