import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService, Message } from 'primeng/api';
import { JobService } from 'src/app/services/job.service';


export interface Job{
  jobId: string;
  jobTitle: string;
  minSalary: number;
  maxSalary: number;
}

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
  providers: [ConfirmationService,MessageService]
})
export class JobComponent implements OnInit {
  jobs:any;
  jobId:string='';
  jobName:string='';
  minSalary:number=0;
  maxSalary:number=0;
  deleteId='';
  displayDelete=false;
  show: boolean = true;

  
  first=0;
  rows=10;
  nama:string=''
  showSearch:boolean=false;
  displayForm:boolean=false;
  submitted:boolean=false;
  displayMaximizable: boolean = false;
  action=0;
  keyword:any;

  row: any={
    jobTitle: '',
    minSalary: 0,
    maxSalary: 0,
  }

  constructor(
    private jobService: JobService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {  
    this.loadData();

    }

  loadData(){
    this.jobService.getJob().subscribe(
      {
        next: (data)=>{
          console.log(data)
          this.jobs=data.data
            //this.onReset();
        },
        error: (err)=>{
          console.log('error cuy')
        }
      }
    )
  }

  // handleSaveJob(event:any){
  //   console.log(this.row, 'ini rownya')
  //   this.submitted=true;

  //   if(this.handleValidation()){
  //     this.confirmationService.confirm({
  //       message: 'are you sure?',
  //       header: 'confirmation',
  //       icon: 'pi pi exclamation-triangle',
  //       accept: ()=>{
  //         this.jobService.postJob(this.row).subscribe(
  //           {
  //             next: (data)=>{
  //               console.log(data)
  //               if(data.status){
  //                 this.messageService.add({
  //                   severity: 'success',
  //                   summary: 'Input',
  //                   detail: 'Data has been inserted',
  //                 });
  //                 this.loadData();
  //                 this.displayMaximizable=false;
                  
  //               }
  //             },
  //             error: (err)=>{
  //               console.log('error cuy')
  //             }
  //           }
  //         );
    
  //       }
  //     })
  //   }
    
  //   }


  handleSaveJob(event:any){
    this.submitted=true;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept:()=>{
        if(this.handleValidation() && this.action==1){
          this.jobService.postJob(this.row).subscribe({
            next: (data) =>{
              console.log(data);
              if(data.status){
                this.messageService.add({
                  severity: 'success',
                  summary: 'Input',
                  detail: 'Data has been inserted',
                });
                this.loadData();
                this.displayMaximizable=false;
              }
            },
            error: (err)=>{
              console.log('error cuy');
            },
          });
        } else{
          console.log('b');
          this.jobService.putJob(this.row).subscribe({
            next: (data) => {
              console.log(data);
              if(data.status){
                this.messageService.add({
                  severity: 'success',
                  summary: 'Input',
                  detail: 'Data has been edited',
                });
                this.loadData();
                this.displayMaximizable=false;
              }
            },
            error: (err)=>{
              console.log('error cuy');
            },
          });
        }
      },
      reject: ()=>{
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Input Failed',
        });
      },
    });
  
  }
    handleSaveJob2(event:any){
      this.submitted=true;
      if(this.handleValidation() && this.action==1){
        this.confirmationService.confirm({
          message:'Are you sure that you want to perform this action?',
        accept: () => {
          this.jobService.postJob(this.row).subscribe(
            {
              next: (data) => {
                console.log(data);
                if(data.status){
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Input',
                    detail: 'Data has been inserted',
                  });
                  this.loadData();
                  this.displayMaximizable=false;
                }
              },
              error: (err) => {
                console.log('error cuy');
              },
            }
          );
        },

        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Input Failed',
          });
        },
        });
      } else if(this.handleValidation() && this.action==2){
        this.confirmationService.confirm({
          message: 'Are you sure that yo want to perform this action?',
          accept: () => {
            this.jobService.putJob(this.row).subscribe({
              next: (data) => {
                console.log(data);
                if(data.status){
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Edit',
                    detail: 'Data has been edited',
                  });
                  this. loadData();
                  this.displayMaximizable=false;
                }
              },
              error: (err) => {
                console.log('error cuy');
              },
            });
          },
          reject: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Edit Failed',
            });
          }
        })

      }

    }
    
    handleValidation(){
      let result: boolean=false;

      if(this.row.jobId!=='' && this.row.jobTitle!==''){
        if( this.row.minSalary<0 || this.row.maxSalary<0){
          result=false;
        }else{
          result=true;
        }
      }
      return result;
    }
    
    handleResetJob(event:any, param:string): void{
      this.row={
        jobId:(this.action==2 && param=='click')?this.row.jobId:'',
        jobTitle:'',
        minSalary:0,
        maxSalary:0,
      }
    }
    
    openEdit(row:any){
    this.row={...row}
    this.displayMaximizable = true;
    this.action=2;
    }

    deleteData(){
      this.jobService.deleteJob(this.deleteId).subscribe(
        res => {
          console.log(res)
          this.loadData();
          // this.showSuccess();
        })
      this.displayDelete = false;
    }
    
    searchJobTitle(keyword:string): void {
      this.jobService.getJobByTitle(keyword).subscribe(
        res => {
          this.jobs=res;
        }
      );
    
    }

    showDeleteDialog(id: string){
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


    showMaximizableDialog(act: number) {
      this.displayMaximizable = true;
      this.action = act;
    }
  
  next(){
    this.first=this.first+this.rows;
  }

  prev(){
    this.first=this.first-this.rows;
  }

  reset(){
    this.first=0;
  }

  isLastPage(): boolean{
    return this.jobs?this.first === (this.jobs.length-this.rows) : true;
  }

  isFirstPage():boolean{
    return this.jobs?this.first === 0 : true;
  }

  showSearchCall(){
    this.showSearch = !this.showSearch;
  }

  showForm(){
    this.displayForm=!this.displayForm;
  }

}
