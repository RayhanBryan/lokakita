import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css'],
})
export class RegionComponent implements OnInit {
  // regions: any;
  regions = [
    { regionId: 1, regionName: 'Antartica' },
    { regionId: 2, regionName: 'Wonderland' },
  ];
  first = 0;
  rows = 10;
  showSearch: boolean = false;
  nama: string = '';
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
    return this.regions ? this.first === (this.regions.length - this.rows): true;
  }

  isFirstPage(): boolean {
    return this.regions ? this.first === 0 : true;
  }

  showSearchCall(){
    this.showSearch = !this.showSearch;
  }

  showForm(){
    this.displayForm=!this.displayForm;
  }
}
