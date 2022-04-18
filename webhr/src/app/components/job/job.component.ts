import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  jobs=[
    {jobId:'TC_AST',jobTitle:'Teaching Assistant', minSalary:1000, maxSalary:12000},
    {jobId:'MK_AST',jobTitle:'Marketing Assistant', minSalary:1000, maxSalary:15000},
    {jobId:'CU_SVC',jobTitle:'Customer Service', minSalary:1000, maxSalary:10000}
  ]

  
  first=0;
  rows=10;
  nama:string=''
  showSearch:boolean=false;
  displayForm:boolean=false;


  constructor() { }

  ngOnInit(): void {
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
