import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
// import { ConfirmationService } from 'primeng/api/confirmationservice';
// import { MessageService } from 'primeng/api/messageservice';
// import Swal from 'sweetalert2';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class LocationComponent implements OnInit {
  locations: any;
  row: any = {
    locationId: 0,
    streetAddress: '',
    postalCode: '',
    city: '',
    stateProvince: '',
    countryId: '',
    countryName: '',
    createdDate: null,
  };
  first = 0;
  rows = 10;
  keyword: string = '';
  showSearch: boolean = false;
  displayForm: boolean = false;

  constructor(
    private locationService: LocationService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.getLocation();
  }

  next() {
    this.first = this.first + this.rows;
    console.log(this.isLastPage());
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.locations
      ? this.first === this.locations.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.locations ? this.first === 0 : true;
  }

  showSearchCall() {
    this.showSearch = !this.showSearch;
  }

  showForm() {
    this.displayForm = !this.displayForm;
  }

  // API
  getLocation() {
    this.locationService.getLocation().subscribe({
      next: (data: any) => {
        this.locations = data.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  search() {
    this.locationService.searchLocation(this.keyword).subscribe({
      next: (data: any) => {
        if (data.data.length == 0) {
        }
        this.locations = data.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  displayDelete: boolean = false;
  deleteId: number = 0;

  deleteData() {
    this.locationService.deleteLocation(this.deleteId).subscribe((res) => {
      console.log(res);
      this.getLocation();
      console.log('hahahahahahaha');
    });
    this.displayDelete = false;
  }

  showDeleteDialog(id: number) {
    console.log('hahahahahaha');
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

  resetForm() {
    let tempRowLocationId = this.row.locationId;
    this.row = {
      locationId: 0,
      streetAddress: '',
      postalCode: '',
      city: '',
      stateProvince: '',
      countryId: '',
      countryName: '',
      createdDate: null,
    };
  }

  showMaximizableDialog(act: number) {
    this.row.locationId = 0;
    this.displayMaximizable = true;
    this.action = act;
    this.getCountry();
  }

  openEdit(locationId: number) {
    this.getLocationById(locationId);
    this.getCountry();
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

  handleValidation() {
    console.log(this.row);
    if (this.row.streetAddress.length == 0) {
      return true;
    }
    return false;
  }

  submit(): void {
    console.log(this.handleValidation(), 'handlevalid');
    this.submitted = true;
    this.displayMaximizable = false;
    if (this.handleValidation()) {
      return;
    }
    console.log(this.row.locationId);
    if (this.row.locationId == 0) {
      this.row.locationId = null;
      console.log(this.row.locationId);

      this.locationService.postLocation(this.row).subscribe({
        next: (data) => {
          console.log(data);
          if (data.status) {
            this.resetForm();
            this.getLocation();
            this.messageService.add({
              severity: 'success',
              summary: 'Confirmed',
              detail: 'Data added',
            });
          }
        },
        error: (err) => {
          console.log('Error broh');
        },
      });
    } else {
      this.locationService.putLocation(this.row).subscribe({
        next: (data) => {
          if (data.status) {
            this.resetForm();
            this.getLocation();
            this.messageService.add({
              severity: 'success',
              summary: 'Confirmed',
              detail: 'Data edited',
            });
          }
        },
        error: (err) => {
          console.log('Error broh');
        },
      });
    }
  }

  getLocationById(locationId: number) {
    this.locationService.getLocationById(locationId).subscribe((res) => {
      this.row = res.data;
      console.log(res.data);
      console.log(res.data);
    });
  }

  countries: any;
  getCountry() {
    this.countryService.getCountry().subscribe({
      next: (data: any) => {
        this.countries = data.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
