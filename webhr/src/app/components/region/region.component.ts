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

  onChanged(){

  }

  showMaximizableDialog(){

  }
}
