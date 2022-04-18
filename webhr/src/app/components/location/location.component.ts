import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
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
    return false;
  }

  isFirstPage(): boolean {
    return false;
  }
}
