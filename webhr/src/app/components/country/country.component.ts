import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { InputText } from 'primeng/inputtext';
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
  styleUrls: ['./country.component.css'],
  providers: [ConfirmationService,MessageService]

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
  action:number=0;
  keyword:string='';
  deleteId:string='';
  displayDelete=false;

  editable:boolean=false;

  selectedRegion: any;
  countryId: string='';
  countryName: string='';
  regionId: string='';
  res:any;

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
    private regionService: RegionService,
    private messageService: MessageService
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



// handleSaveCountry(event:any){
// console.log(this.row, 'ini rownya')
// this.submitted=true;


// if(this.handleValidation()){
//   this.confirmationService.confirm({
//     message: 'are you sure?',
//     header: 'confirmation',
//     icon: 'pi pi exclamation-triangle',
//     accept: ()=>{
//       this.countryService.postCountry(this.row).subscribe(
//         {
//           next: (data)=>{
//             console.log(data)
//             if(data.status){
//               this.messageService.add({
//                 severity: 'success',
//                 summary: 'Input',
//                 detail: 'Data has been inserted',
//               });
//               this.loadData();
//               this.display=false;
              
  
//             }
//           },
//           error: (err)=>{
//             console.log('error cuy')
//           }
//         }
//       );

//     },
    

//   })
// }

// }

handleSaveCountry(event:any){
  this.submitted=true;
  this.confirmationService.confirm({
    message: 'Are you sure that you want to perform this action?',
    accept:()=>{
      if(this.handleValidation() && this.action==1){
        this.countryService.postCountry(this.row).subscribe({
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
        this.countryService.putCountry(this.row).subscribe({
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


handleValidation(){
let result: boolean=false;
//console.log(this.row.regionId)
if(this.row.countryId.length==2 && this.row.countryName.length>0 && this.row.regionId !==''){
  result=true;
}

return result;

}

handleResetCountry(event:any, param:string): void{
this.row={
  countryId:(this.action==2 && param=='click')?this.row.countryId:'',
  countryName:'',
  regionId:''
}

}

openEdit(row:any){
this.row={...row}
this.displayMaximizable = true;
this.action=2;


}

// openInsert(){
// this.displayBasic=true;
// this.action='add';
// }

getRegion(): void{
this.regionService.getRegion().subscribe(
  res=> {
    this.regions=res.data;
    console.log(res, 'aaaaa');
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

deleteData(){
  this.countryService.deleteCountry(this.deleteId).subscribe(
    res => {
      console.log(res)
      this.loadData();
      // this.showSuccess();
    })
  this.displayDelete = false;
}

searchCountryName(keyword:string): void {
  this.countryService.getCountryByName(keyword).subscribe(
    res => {
      
      this.countries=res;
      console.log(res);
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

displayMaximizable: boolean = false;
    
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
