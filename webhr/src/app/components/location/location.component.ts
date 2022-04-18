import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
// import { ConfirmationService } from 'primeng/api/confirmationservice';
// import { MessageService } from 'primeng/api/messageservice';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  // providers:[ConfirmationService, MessageService]
})
export class LocationComponent implements OnInit {
  locations: any;
  // locations = [
  //   { locationId: 1, streetAddress: 'Jalan Selatan', postalCode:'55781', city:'Bandung', stateProvince:'Jawa Barat', countryId:'ID',countryName:'Indonesia',createdDate:'19 April 2020' },
  //   { locationId: 2, streetAddress: 'Jalan Utara', postalCode:'55782', city:'Lembang', stateProvince:'Jawa Barat', countryId:'ID',countryName:'Indonesia',createdDate:'20 April 2020' },
  //   { locationId: 3, streetAddress: 'Jalan Utara', postalCode:'55782', city:'Lembang', stateProvince:'Jawa Barat', countryId:'ID',countryName:'Indonesia',createdDate:'20 April 2020' },
  //   { locationId: 4, streetAddress: 'Jalan Utara', postalCode:'55782', city:'Lembang', stateProvince:'Jawa Barat', countryId:'ID',countryName:'Indonesia',createdDate:'20 April 2020' },
  //   { locationId: 5, streetAddress: 'Jalan Utara', postalCode:'55782', city:'Lembang', stateProvince:'Jawa Barat', countryId:'ID',countryName:'Indonesia',createdDate:'20 April 2020' },
  //   { locationId: 6, streetAddress: 'Jalan Selatan', postalCode:'55781', city:'Bandung', stateProvince:'Jawa Barat', countryId:'ID',countryName:'Indonesia',createdDate:'19 April 2020' },
  //   { locationId: 7, streetAddress: 'Jalan Utara', postalCode:'55782', city:'Lembang', stateProvince:'Jawa Barat', countryId:'ID',countryName:'Indonesia',createdDate:'20 April 2020' },
  //   { locationId: 8, streetAddress: 'Jalan Utara', postalCode:'55782', city:'Lembang', stateProvince:'Jawa Barat', countryId:'ID',countryName:'Indonesia',createdDate:'20 April 2020' },
  //   { locationId: 9, streetAddress: 'Jalan Utara', postalCode:'55782', city:'Lembang', stateProvince:'Jawa Barat', countryId:'ID',countryName:'Indonesia',createdDate:'20 April 2020' },
  //   { locationId: 10, streetAddress: 'Jalan Utara', postalCode:'55782', city:'Lembang', stateProvince:'Jawa Barat', countryId:'ID',countryName:'Indonesia',createdDate:'20 April 2020' },
  //   { locationId: 11, streetAddress: 'Jalan Selatan', postalCode:'55781', city:'Bandung', stateProvince:'Jawa Barat', countryId:'ID',countryName:'Indonesia',createdDate:'19 April 2020' },
  //   { locationId: 12, streetAddress: 'Jalan Utara', postalCode:'55782', city:'Lembang', stateProvince:'Jawa Barat', countryId:'ID',countryName:'Indonesia',createdDate:'20 April 2020' },
  //   { locationId: 13, streetAddress: 'Jalan Utara', postalCode:'55782', city:'Lembang', stateProvince:'Jawa Barat', countryId:'ID',countryName:'Indonesia',createdDate:'20 April 2020' },
  //   { locationId: 14, streetAddress: 'Jalan Utara', postalCode:'55782', city:'Lembang', stateProvince:'Jawa Barat', countryId:'ID',countryName:'Indonesia',createdDate:'20 April 2020' },
  //   { locationId: 15, streetAddress: 'Jalan Utara', postalCode:'55782', city:'Lembang', stateProvince:'Jawa Barat', countryId:'ID',countryName:'Indonesia',createdDate:'20 April 2020' },
  //   { locationId: 16, streetAddress: 'Jalan Selatan', postalCode:'55781', city:'Bandung', stateProvince:'Jawa Barat', countryId:'ID',countryName:'Indonesia',createdDate:'19 April 2020' },
  //   { locationId: 17, streetAddress: 'Jalan Utara', postalCode:'55782', city:'Lembang', stateProvince:'Jawa Barat', countryId:'ID',countryName:'Indonesia',createdDate:'20 April 2020' },
  //   { locationId: 18, streetAddress: 'Jalan Utara', postalCode:'55782', city:'Lembang', stateProvince:'Jawa Barat', countryId:'ID',countryName:'Indonesia',createdDate:'20 April 2020' },
  //   { locationId: 19, streetAddress: 'Jalan Utara', postalCode:'55782', city:'Lembang', stateProvince:'Jawa Barat', countryId:'ID',countryName:'Indonesia',createdDate:'20 April 2020' },
  //   { locationId: 20, streetAddress: 'Jalan Utara', postalCode:'55782', city:'Lembang', stateProvince:'Jawa Barat', countryId:'ID',countryName:'Indonesia',createdDate:'20 April 2020' },
  //   { locationId: 21, streetAddress: 'Jalan Selatan', postalCode:'55781', city:'Bandung', stateProvince:'Jawa Barat', countryId:'ID',countryName:'Indonesia',createdDate:'19 April 2020' },
  //   { locationId: 22, streetAddress: 'Jalan Utara', postalCode:'55782', city:'Lembang', stateProvince:'Jawa Barat', countryId:'ID',countryName:'Indonesia',createdDate:'20 April 2020' },
  //   { locationId: 23, streetAddress: 'Jalan Utara', postalCode:'55782', city:'Lembang', stateProvince:'Jawa Barat', countryId:'ID',countryName:'Indonesia',createdDate:'20 April 2020' },
  //   { locationId: 24, streetAddress: 'Jalan Utara', postalCode:'55782', city:'Lembang', stateProvince:'Jawa Barat', countryId:'ID',countryName:'Indonesia',createdDate:'20 April 2020' },
  //   { locationId: 25, streetAddress: 'Jalan Utara', postalCode:'55782', city:'Lembang', stateProvince:'Jawa Barat', countryId:'ID',countryName:'Indonesia',createdDate:'20 April 2020' },
  // ];
  location= { locationId: 25, streetAddress: 'Jalan Utara', postalCode:'55782', city:'Lembang', stateProvince:'Jawa Barat', countryId:'ID',countryName:'Indonesia',createdDate:'20 April 2020' };
  first = 0;
  rows = 10;
  nama:string='';
  showSearch:boolean=false;
  displayForm:boolean=false;

  constructor(
    private locationService: LocationService,
  ) {}

  ngOnInit(): void {
    this.getALlLocations();
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
    // console.log(this.first,this.locations.length, this.rows, this.locations.length - this.rows);
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

  // API
  getALlLocations() {
    this.locationService.getLocation().subscribe({
      next:(data:any)=>{
        this.locations = data.data;
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Could not load records!',
        });
      },
    });
  }
  
}
