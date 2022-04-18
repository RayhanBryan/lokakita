import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
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
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  jobs:any;
  jobId:string='';
  jobName:string='';
  minSalary:number=0;
  maxSalary:number=0;

  
  first=0;
  rows=10;
  nama:string=''
  showSearch:boolean=false;
  displayForm:boolean=false;
  submitted:boolean=false;
  action:string='';
  keyword:any;

  row: Job={
    jobId: '',
    jobTitle: '',
    minSalary: 0,
    maxSalary: 0,
  }

  display: boolean = false;
  displayModal: boolean = false;
  displayBasic: boolean=false;



  constructor(
    private jobService: JobService,
    private confirmationService: ConfirmationService,
    private router: Router
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

  handleSaveJob(event:any){
    console.log(this.row, 'ini rownya')
    this.submitted=true
    //this.row.hireDate=this.datepipe.transform(this.row.hireDate, 'yyyy-MM-dd');
    
    if(this.handleValidation()){
      this.confirmationService.confirm({
        message: 'are you sure?',
        header: 'confirmation',
        icon: 'pi pi exclamation-triangle',
        accept: ()=>{
          this.jobService.postJob(this.row).subscribe(
            {
              next: (data)=>{
                console.log(data)
                if(data.status){
                  this.displayBasic=false;
                  
                  alert('berhasil.')
                  this.loadData();
                  
                  // this.router.navigate(['/countries'])
                }
              },
              error: (err)=>{
                console.log('error cuy')
              }
            }
          );
    
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
    
    handleResetJob(event:any): void{
      this.row={
        jobId:'',
        jobTitle:'',
        minSalary:0,
        maxSalary:0
      }
    
    }
    
    openEdit(row:any){
    this.row={...row}
    this.displayBasic=true;
    this.action='edit';
    }
    
    openInsert(){
    this.displayBasic=true;
    this.action='add';
    }
    
    delJob(id:string): void {
    if(confirm('Are you sure want to delete this Job?')){
      this.jobService.deleteJob(id).subscribe(data => {
        this.router.navigate(['/job']);
         this.loadData();
    })}else{
      alert("Delete data canceled.");
      this.loadData();
    }
    
    }
    
    searchJobTitle(): void {
      console.log(this.keyword)
      this.jobService.getJobByTitle(this.keyword).subscribe(
        res => {
          
          this.jobs=res;
          console.log(res);
        }
      );
    
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
    return this.jobs?this.first===(this.jobs.length-this.rows):true;
  }

  isFirstPage():boolean{
    return this.jobs?this.first===0:true;
  }

  showSearchCall(){
    this.showSearch = !this.showSearch;
  }

  showForm(){
    this.displayForm=!this.displayForm;
  }

}
