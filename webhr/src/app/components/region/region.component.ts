import { Component, OnInit } from '@angular/core';
import { RegionService } from 'src/app/services/region.service';
// import Swal from 'sweetalert2';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css'],
})
export class RegionComponent implements OnInit {
  regions: any;
  region = { regionId: 0, regionName: '' };
  first = 0;
  rows = 10;
  showSearch: boolean = false;
  keyword: string = '';
  displayForm: boolean = false;

  constructor(private regionService: RegionService) {}

  ngOnInit(): void {
    this.getALlRegions();
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

  // API
  getALlRegions() {
    this.regionService.getRegion().subscribe({
      next: (data: any) => {
        this.regions = data.data;
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

  search(){
    this.regionService.searchRegion(this.keyword).subscribe({
      next:(data:any)=>{
        if(data.data.length==0){
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Sorry',
          //   text: 'The search key was not found in any record!',
          // });
        }
        this.regions = data.data;
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
