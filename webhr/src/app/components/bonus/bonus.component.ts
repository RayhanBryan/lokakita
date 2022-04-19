import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.css']
})
export class BonusComponent implements OnInit {
  bonus: any;
  first = 0;
  rows = 10;
  display: boolean = false;
  submitted: boolean = false;
  action: string = '';
  id: number = 0;
  dataBonus: any;

  row: any = {
    Ename: '',
    jobId: '',
    salary: 0,
    commission: 0
  };

  constructor() { }

  ngOnInit(): void {
  }

  showDialog(action: string) {
    this.display = true;
    this.action = action;
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
    return this.bonus
      ? this.first === this.bonus.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.bonus ? this.first === 0 : true;
  }

}
