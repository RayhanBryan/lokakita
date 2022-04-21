import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
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

  // SHOW LOCATIONS
  getLocation() {
    this.locationService.getLocation().subscribe({
      next: (data: any) => {
        this.locations = data.data;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not load the location content',
        });
      },
    });
  }

  /**
   * This is a function to search a record
   */
  searchOption: string = 'streetAddress';
  searchOptions = [
    { label: 'search by street Address', value: 'streetAddress' },
    { label: 'search by city', value: 'city' },
    { label: 'search by country', value: 'countryName' },
    { label: 'search by state province', value: 'stateProvince' },
  ];
  search() {
    console.log(this.keyword);
    switch (this.searchOption) {
      case 'city':
        this.searchByCity();
        break;
      case 'streetAddress':
        this.searchByStreetAddress();
        break;
      case 'countryName':
        this.searchByCountryName();
        break;
      case 'stateProvince':
        this.searchByStateProvince();
        break;
    }
  }

  /**
   * This is a function to search location using city
   */
  searchByCity() {
    this.locationService.searchLocationByCity(this.keyword).subscribe({
      next: (data: any) => {
        if (data.data.length == 0) {
        }
        this.locations = data.data;
      },
      error: (err) => {
      },
    });
  }

  /**
   * This is a function to search location using streetAddress
   */
  searchByStreetAddress() {
    this.locationService.searchLocation(this.keyword).subscribe({
      next: (data: any) => {
        if (data.data.length == 0) {
        }
        this.locations = data.data;
      },
      error: (err) => {
      },
    });
  }

  /**
   * This is a function to search location using countryName
   */
   searchByCountryName() {
    this.locationService.searchLocationByCountryName(this.keyword).subscribe({
      next: (data: any) => {
        if (data.data.length == 0) {
        }
        this.locations = data.data;
      },
      error: (err) => {
      },
    });
  }

  /**
   * This is a function to search location using state/province
   */
   searchByStateProvince() {
    this.locationService.searchLocationByStateProvince(this.keyword).subscribe({
      next: (data: any) => {
        if (data.data.length == 0) {
        }
        this.locations = data.data;
      },
      error: (err) => {
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
    this.locationService.deleteLocation(this.deleteId).subscribe({
      next: (data: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmed',
          detail: 'Data deleted',
        });
        this.getLocation();
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
   * @param id this is the ID of a location record we want to delete
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

  /**
   * This function resets create and update forms
   */
  resetForm() {
    this.submitted = false;
    this.row = {
      locationId: this.row.locationId,
      streetAddress: '',
      postalCode: '',
      city: '',
      stateProvince: '',
      countryId: '',
      countryName: '',
      createdDate: null,
    };
  }

  /**
   * This function shows a create form
   */
  showMaximizableDialog(act: number) {
    this.row.locationId = 0;
    this.displayMaximizable = true;
    this.action = act;
    this.getCountry();
  }

  /**
   * This function shows an update form
   */
  openEdit(locationId: number) {
    this.getLocationById(locationId);
    this.getCountry();
    this.displayMaximizable = true;
    this.action = 2;
  }

  /**
   * This function is used to check if all fields on a form is valid
   * @returns TRUE if the input form is invalid, FALSE otherwise
   */
  handleValidation() {
    if (
      this.row.streetAddress.length == 0 ||
      this.row.postalCode.length == 0 ||
      this.row.countryId.length == 0 ||
      this.row.city.length == 0 ||
      this.row.stateProvince.length == 0 ||
      this.row.createdDate == null
    ) {
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
        if (this.row.locationId == 0) {
          this.row.locationId = null;
          this.locationService.postLocation(this.row).subscribe({
            next: (data) => {
              if (data.status) {
                this.resetForm();
                this.getLocation();
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
   * @param locationId this is the location ID of a record we want to update
   */
  getLocationById(locationId: number) {
    this.locationService.getLocationById(locationId).subscribe({
      next: (data: any) => {
        this.row = data.data;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not load the location content',
        });
      },
    });
  }

  /**
   * This function sends a get request and then fill the country dropdown in the form
   */
  countries: any;
  getCountry() {
    this.countryService.getCountry().subscribe({
      next: (data: any) => {
        this.countries = data.data;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not load the country content',
        });
      },
    });
  }
}
