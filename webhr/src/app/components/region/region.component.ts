import { Component, OnInit } from '@angular/core';
import { RegionService } from 'src/app/services/region.service';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class RegionComponent implements OnInit {
  regions: any;
  // region = { regionId: 0, regionName: '' };
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
    if (this.regions!=null){
      if(this.regions.length<this.rows){
        return true;
      }
      else{
        return (this.regions.length-this.first<=this.rows);
      }
    }
    return true;
  }

  isFirstPage(): boolean {
    return this.regions ? this.first === 0 : true;
  }

  showSearchCall() {
    this.showSearch = !this.showSearch;
  }

  // SHOW REGIONS
  getRegion() {
    this.regionService.getRegion().subscribe({
      next: (data: any) => {
        this.regions = data.data;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not load the region content',
        });
      },
    });
  }

  /**
   * This is a function to search
   */
  search() {
    this.regionService.searchRegion(this.keyword).subscribe({
      next: (data: any) => {
        if (data.data.length == 0) {
          // this.messageService.add({
          //   severity: 'warn',
          //   summary: 'No result',
          //   detail: 'The search key was not found in any record!',
          // });
        }
        this.regions = data.data;
      },
      error: (err) => {
        // this.messageService.add({
        //   severity: 'error',
        //   summary: 'Error',
        //   detail: 'Could not load the location content',
        // });
      },
    });
  }

  //DELETE
  displayDelete: boolean = false;
  deleteId: number = 0;

  /**
   * This is a function to send a delete request
   */
  deleteData() {
    this.regionService.deleteRegion(this.deleteId).subscribe({
      next: (data: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmed',
          detail: 'Data deleted',
        });
        this.getRegion();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not delete the record',
        });
      },
    });
    this.displayDelete = false;
  }

  /**
   * This function shows a delete dialog
   * @param id this is the ID of a region record we want to delete
   */
  showDeleteDialog(id: number) {
    this.deleteId = id;
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteData();
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

  //CREATE AND UPDATE FORM
  action: number = 0;
  submitted: boolean = false;
  displayMaximizable: boolean = false;

  row: any = {
    regionId: 0,
    regionName: '',
  };

  /**
   * This function resets create and update forms
   */
  resetForm() {
    this.submitted = false;
    this.row = {
      regionId: this.row.regionId,
      regionName: '',
    };
  }

  /**
   * This function shows a create form
   */
  showMaximizableDialog(act: number) {
    this.row.regionId = 0;
    this.displayMaximizable = true;
    this.action = act;
  }

  /**
   * This function shows an update form
   */
  openEdit(regionId: number) {
    this.getRegionById(regionId);
    this.displayMaximizable = true;
    this.action = 2;
  }

  /**
   * This function is used to check if all fields on a form is valid
   * @returns TRUE if the input form is invalid, FALSE otherwise
   */
  handleValidation() {
    if (this.row.regionName.length == 0) {
      return true;
    }
    return false;
  }

  /**
   * This function sends a post or put request
   * if the current location ID is zero, it sends a post request.
   * Otherwise, it sends a put request
   */
  submit(): void {
    this.submitted = true;
    if (this.handleValidation()) {
      return;
    }
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      header: 'Action Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        if (this.row.regionId == 0) {
          this.row.regionId = null;
          this.regionService.postRegion(this.row).subscribe({
            next: (data) => {
              if (data.status) {
                this.resetForm();
                this.getRegion();
                this.messageService.add({
                  severity: 'success',
                  summary: 'Confirmed',
                  detail: 'Data added',
                });
              }
              this.displayMaximizable = false;
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
          this.regionService.putRegion(this.row).subscribe({
            next: (data) => {
              if (data.status) {
                this.resetForm();
                this.getRegion();
                this.messageService.add({
                  severity: 'success',
                  summary: 'Confirmed',
                  detail: 'Data edited',
                });
              }
              this.displayMaximizable = false;
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Could not update the record',
              });
            },
          });
        }
      },
      reject: () => {},
    });
  }

  /**
   * This function fills the update form
   * @param regionId this is the location ID of a record we want to update
   */
  getRegionById(regionId: number) {
    this.regionService.getRegionById(regionId).subscribe({
      next: (data: any) => {
        this.row = data.data;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not load the region content',
        });
      },
    });
  }
}
