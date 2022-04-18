import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  countries=[
    {countryId: 'KR', countryName:'Republic of Korea', regionId:3, regionName:'Asia'},
    {countryId:'SE', countryName:'Swedia', regionId:1, regionName:'Europe'}
  ]

  

  first=0;
  rows=10;
  nama:string=''
  showSearch:boolean=false;
  displayForm:boolean=false;

  constructor() { }

  ngOnInit(): void {}

  next(){
    this.first=this.first+this.rows;
  }

  prev(){
    this.first=this.first-this.rows;
  }

  reset(){
    this.first=0;
  }

  isLastPage(): boolean{
    return this.countries?this.first===(this.countries.length-this.rows):true;
  }

  isFirstPage():boolean{
    return this.countries?this.first===0:true;
  }

  showSearchCall(){
    this.showSearch = !this.showSearch;
  }

  showForm(){
    this.displayForm=!this.displayForm;
  }

}
