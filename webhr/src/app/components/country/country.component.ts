import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { CountryService } from 'src/app/services/country.service';
import { RegionService } from 'src/app/services/region.service';

export interface Country{
  countryId: string;
  countryName: string;
  regionId: string;
}

export interface Region{
  regionId: number;
  regionName: string;
}

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  countries:any;
  first=0;
  rows=10;
  nama:string=''
  showSearch:boolean=false;
  displayForm:boolean=false;
  regions:any;
  submitted:boolean=false;
  action:string='';
  keyword:string='';

  row: Country={
    countryId:'',
    countryName:'',
    regionId:''
  }

  row_loc: Region={
    regionId: 0,
    regionName: ''

  }

  display: boolean = false;
  displayModal: boolean = false;
  displayBasic: boolean=false;


  constructor(
    private countryService: CountryService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private regionService: RegionService
    ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.countryService.getCountry().subscribe(
      {
        next: (data)=>{
          console.log(data)
          this.countries=data.data
            //this.onReset();
        },
        error: (err)=>{
          console.log('error cuy')
        }
      }
    )

    this.regions=this.getRegion();
  }

// showDialog() {
//     this.display = true;
// }

// showBasicDialog() {
//   this.displayBasic = true;
// }

// showModalDialog() {
//   this.displayModal = true;
// }

handleSaveCountry(event:any){
console.log(this.row, 'ini rownya')
this.submitted=true;


if(this.handleValidation()){
  this.confirmationService.confirm({
    message: 'are you sure?',
    header: 'confirmation',
    icon: 'pi pi exclamation-triangle',
    accept: ()=>{
      this.countryService.postCountry(this.row).subscribe(
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
//console.log(this.row.regionId)
if(this.row.countryId.length==2 && this.row.countryName.length>0 && this.row.regionId !==''){
  result=true;
}

return result;

}

handleResetCountry(event:any): void{
this.row={
  countryId:'',
  countryName:'',
  regionId:''
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

getRegion(): void{
this.regionService.getRegion().subscribe(
  res=> {
    this.regions=res;
    //console.log(res, 'aaaaa');
  }
)
}

delCountry(id:string): void {
if(confirm('Are you sure want to delete this country?')){
  this.countryService.deleteCountry(id).subscribe(data => {
    this.router.navigate(['/country']);
     this.loadData();
})}else{
  alert("Delete data canceled.");
  this.loadData();
}

}

searchCountryName(): void {
  console.log(this.keyword)
  this.countryService.getCountryByName(this.keyword).subscribe(
    res => {
      
      this.countries=res;
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
    return this.countries?this.first===(this.countries.length-this.rows):true;
  }

  isFirstPage():boolean{
    return this.countries?this.first===0:true;
  }

  showSearchCall(){
    this.showSearch = !this.showSearch;
  }

  showForm(){
    this.displayForm=!this.displayForm;
  }

}
