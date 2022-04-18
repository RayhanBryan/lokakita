import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
// import { ConfirmationService } from 'primeng/api/confirmationservice';
// import { MessageService } from 'primeng/api/messageservice';
// import Swal from 'sweetalert2';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  // providers:[ConfirmationService, MessageService]
})
export class LocationComponent implements OnInit {
  locations: any;
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
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: 'Something went wrong! Could not load records!',
        // });
      },
    });
  }
  
}
