import { Component, OnInit } from '@angular/core';
// import { ConfirmationService } from 'primeng/api/confirmationservice';
// import { MessageService } from 'primeng/api/messageservice';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  // providers:[ConfirmationService, MessageService]
})
export class LocationComponent implements OnInit {
  // locations: any;
  locations = [
    { locationId: 1, streetAddress: 'Jalan Selatan', postalCode:'55781', city:'Bandung', stateProvince:'Jawa Barat', countryId:'ID',countryName:'Indonesia',createdDate:'19 April 2020' },
    { locationId: 2, streetAddress: 'Jalan Utara', postalCode:'55782', city:'Lembang', stateProvince:'Jawa Barat', countryId:'ID',countryName:'Indonesia',createdDate:'20 April 2020' },
  ];
  first = 0;
  rows = 10;
  nama:string='';
  showSearch:boolean=false;
  displayForm:boolean=false;

  constructor() {}

  ngOnInit(): void {}

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
    return this.locations ? this.first === (this.locations.length - this.rows): true;
  }

  isFirstPage(): boolean {
    return this.locations ? this.first === 0 : true;
  }

  showSearchCall(){
    this.showSearch = !this.showSearch;
  }

  showForm(){
    this.displayForm=!this.displayForm;
  }
}
