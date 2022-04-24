import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
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
  countryId: string='';
  countryName: string='';
  regionId: string='';
  res:any;
  displayMaximizable: boolean = false;

  isView: boolean=false;
  isManage: boolean=false;

  row: Country={
    countryId:'',
    countryName:'',
    regionId:''
  }

  constructor(
    private countryService: CountryService,
    private confirmationService: ConfirmationService,
    private regionService: RegionService,
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.loadData();
    this.isView = Boolean(localStorage.getItem('isView'));
    this.isManage = Boolean(localStorage.getItem('isManage'));
    console.log(this.isManage, 'is manage')
  }

  loadData(){
    this.countryService.getCountry().subscribe(
      {
        next: (data)=>{
          // console.log(data)
          this.countries=data.data
            //this.onReset();
        },
        error: (err) => {
          console.log('error cuy')
        }
      }
    )
    this.regions=this.getRegion();
  }


handleSaveCountry(event:any){
  
  this.submitted=true;
  if(this.handleValidation() && this.action==1){
    this.confirmationService.confirm({
      message:'Are you sure that you want to perform this action?',
    accept: () => {
    this.countryService.postCountry(this.row).subscribe(
      {
      next: (data) => {
        //console.log(data,'tes');
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
    });
  },

  reject: () => {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Input Failed',
    });
  },
  
  } );

  }else if(this.handleValidation() && this.action==2){
    this.confirmationService.confirm({
      message:'Are you sure that you want to perform this action?',
    accept: () => {
    this.countryService.putCountry(this.row).subscribe({
      next: (data) => {
        //console.log(data);
        if(data.status){
          this.messageService.add({
            severity: 'success',
            summary: 'Edit',
            detail: 'Data has been edited',
          });
          
          this.loadData();
          this.displayMaximizable=false;
          
        }
      } ,
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
})}

}


handleValidation(){
let result: boolean=false;
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

getRegion(): void{
this.regionService.getRegion().subscribe(
  res => {
    this.regions=res.data;
  }
)
}


deleteData(){
  this.countryService.deleteCountry(this.deleteId).subscribe(
    res => {
      
      this.loadData();
    })
  this.displayDelete = false;
}

searchCountryName(): void {
  this.countryService.getCountryByName(this.keyword).subscribe(
    res => {
      this.countries=res;
      if(res.length==0){
        this.messageService.add({
          severity: 'warn',
          summary: 'No result',
          detail: 'The search key was not found in any record!',
        });
      }
    }
  );

}

searchRegion(): void {
  this.countryService.getCountryByRegion(this.keyword).subscribe(
    res => {
      this.countries=res;
      console.log(res,'aaaa')
      if (res.length==0){
        this.messageService.add({
          severity: 'warn',
          summary: 'No result',
          detail: 'The search key was not found in any record!',
        });
      }
    }
  );

}

searchOption: string = 'countryName';
searchOptions = [
    { label: 'Country Name', value: 'countryName' },
    { label: 'Region Name', value: 'region' }
  ];
search(){
  switch(this.searchOption){
    case 'countryName':
      this.searchCountryName();
      break;
    case 'region':
      this.searchRegion();
      break;
  }
}  



showDeleteDialog(id: string){
  this.deleteId = id;
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
        this.messageService.add({severity:'success', summary:'Deleted', detail:'Data deleted'});
        this.deleteData();
    },
    reject: (type: any) => {
        switch(type) {
            case ConfirmEventType.REJECT:
                this.messageService.add({severity:'info', summary:'Cancelled', detail:'Your data is safe'});
            break;
            case ConfirmEventType.CANCEL:
                this.messageService.add({severity:'info', summary:'Cancelled', detail:'Your data is safe'});
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
    if (this.countries!=null){
      if(this.countries.length<this.rows){
        return true;
      }
      else{
        return (this.countries.length-this.first<=this.rows);
      }
    }
    return true;
  }

  isFirstPage():boolean{
    return this.countries?this.first === 0 : true;
  }

  showSearchCall(){
    this.showSearch = !this.showSearch;
  }

  showForm(){
    this.displayForm=!this.displayForm;
  }

  keyPressAlphaNumeric(event:any) {

    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z\s]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  

}
