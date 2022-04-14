import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { DepartmentService } from 'src/app/services/department.service';
import { ChangeDetectorRef, AfterContentChecked} from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { LocationService } from 'src/app/services/location.service';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
  providers: [ConfirmationService,MessageService]
})


export class DepartmentComponent implements OnInit {
  row: any = {
    departmentId: 0,
    departmentName: '',
    locationId: 0,
    managerId: 0
  }
  submitted: boolean = false;
  employee: any;
  department: any;
  location: any;
  show: boolean = true;
  showSearch: boolean = false;
  nama: string = '';
  action = 0;
  first = 0;
  rows = 10;
  displayDelete = false;
  deleteId = 0;

  
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private router: Router, private route: ActivatedRoute, private departmentService: DepartmentService, private cdref: ChangeDetectorRef, private employeeService: EmployeeService, private locationService: LocationService) { }
  ngAfterContentChecked() {

    this.cdref.detectChanges();
  }
  items: MenuItem[] = [];
  d: string= '/department';
      
  activeItem: MenuItem | undefined;

  ngOnInit(): void {  
    this.show = true;
    
    this.getDepartment();
    this.employeeService.getEmployee().subscribe(
      res => {
        this.employee = res.data;
        console.log(this.employee)
      }
    )
    
    this.locationService.getLocation().subscribe(
      res => {
        this.location = res.data;
      }
    )
    }
    onChanged(nama: string){
      this.departmentService.getDepartmentByName(nama).subscribe(
        res => {
          this.department = res.data;
          console.log(this.department)
        }
      )
    }
    showSearchCall(){
      this.showSearch = !this.showSearch;
    }

    getDepartment(){
      this.departmentService.getDepartment().subscribe(
        res => {
          // console.log(res);
          this.department = res.data;
          console.log(this.department)
        }
      );
    }

    displayMaximizable: boolean = false;
    
    showMaximizableDialog(act: number) {
      this.displayMaximizable = true;
      this.action = act;
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
        return this.department ? this.first === (this.department.length - this.rows): true;
    }

    isFirstPage(): boolean {
        return this.department ? this.first === 0 : true;
    };

    resetForm(){
      this.row = {
        departmentId: 0,
        departmentName: '',
        managerId: 0,
        locationId: 0
      }
    }

    
    openEdit(row: any){
      this.row = { ...row }
      this.displayMaximizable = true;
      this.action = 2;
      console.log(this.row);
    }

    handleValidation(){
      let err = 0;
      if (this.row.departmentName.length == 0){
        return true
      }
      return false;
    }

    submit(): void{
      console.log(this.handleValidation(), 'handlevalid')
      this.submitted = true;
      this.displayMaximizable = false;
      if (this.handleValidation()){
        return;
      } 
      if (this.row.departmentId == 0){
        this.row.departmentId = null;
        this.departmentService.postDepartment(this.row).subscribe( 
         { 
          next: (data) => {
            console.log(data)
            if (data.status) {
              this.resetForm();
              this.getDepartment();
              this.messageService.add({severity:'success', summary:'Confirmed', detail:'Data added'});
            }
          },
          error: (err) => {
            console.log('Error broh')
          }
        }
        );
      } else{
        this.departmentService.putDepartment(this.row).subscribe( 
          { 
          next: (data) => {
            if (data.status) {
              this.resetForm();
              this.getDepartment();
              this.messageService.add({severity:'success', summary:'Confirmed', detail:'Data edited'});
            }
          },
          error: (err) => {
            console.log('Error broh')
          }
        }
        );
        
      }
    }

    deleteData(){
      this.departmentService.deleteDepartment(this.deleteId).subscribe(
        res => {
          console.log(res)
          this.getDepartment();
          // this.showSuccess();
        })
      this.displayDelete = false;
    }

    showDeleteDialog(id: number){
      this.deleteId = id;
      this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'Data deleted'});
            this.deleteData();
        },
        reject: (type: any) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
                break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
                break;
            }
        }
    });
    };

    showSuccess() {
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
  }
}
