import { Component, OnInit } from '@angular/core';
import { RegionService } from 'src/app/services/region.service';

// import Swal from 'sweetalert2';
import {ConfirmationService,ConfirmEventType,MessageService,} from 'primeng/api';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class RegionComponent implements OnInit {
  regions: any;
  region = { regionId: 0, regionName: '' };
  first = 0;
  rows = 10;
  showSearch: boolean = false;
  keyword: string = '';
  displayForm: boolean = false;

  constructor(
    private regionService: RegionService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getRegion();
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
    return this.regions ? this.first === this.regions.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.regions ? this.first === 0 : true;
  }

  showSearchCall() {
    this.showSearch = !this.showSearch;
  }

  showForm() {
    this.displayForm = !this.displayForm;
  }

  // Get All Region
  getRegion() {
    this.regionService.getRegion().subscribe({
      next: (data: any) => {
        this.regions = data.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  search() {
    this.regionService.searchRegion(this.keyword).subscribe({
      next: (data: any) => {
        if (data.data.length == 0) {
        }
        this.regions = data.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  //Delete
  displayDelete: boolean = false;
  deleteId: number = 0;

  deleteData() {
    this.regionService.deleteRegion(this.deleteId).subscribe((res) => {
      console.log(res);
      this.getRegion();
      console.log('hahahahahahaha')
    });
    this.displayDelete = false;
  }

  showDeleteDialog(id: number) {
    console.log('hahahahahaha')
    this.deleteId = id;
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Data deleted',
        });
        this.deleteData();
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }

  //Show Update and Input Form
  action: number = 0;
  submitted: boolean = false;
  displayMaximizable: boolean = false;

  row: any = {
    regionId: 0,
    regionName: '',
  };

  resetForm() {
    let tempRowRegionId=this.row.regionId;
    this.row = {
      regionId: tempRowRegionId,
      regionName: '',
    };
  }

  showMaximizableDialog(act: number) {
    this.row.regionId=0;
    this.displayMaximizable = true;
    this.action = act;
  }

  openEdit(regionId:number) {
    this.getRegionById(regionId)
    this.displayMaximizable = true;
    this.action = 2;
    console.log(this.row);
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
    });
  }

  handleValidation(){
    if (this.row.regionName.length == 0){
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
    console.log(this.row.regionId)
    if (this.row.regionId == 0){
      this.row.regionId = null;
      console.log(this.row.regionId)

      this.regionService.postRegion(this.row).subscribe( 
       { 
        next: (data) => {
          console.log(data)
          if (data.status) {
            this.resetForm();
            this.getRegion();
            this.messageService.add({severity:'success', summary:'Confirmed', detail:'Data added'});
          }
        },
        error: (err) => {
          console.log('Error broh')
        }
      }
      );
    } else{
      this.regionService.putRegion(this.row).subscribe( 
        { 
        next: (data) => {
          if (data.status) {
            this.resetForm();
            this.getRegion();
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

  getRegionById(regionId:number){
    this.regionService.getRegionById(regionId).subscribe((res) => {
      this.row = res.data;
      console.log(res.data);
    });
  }
}
