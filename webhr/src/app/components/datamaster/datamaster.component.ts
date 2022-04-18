import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-datamaster',
  templateUrl: './datamaster.component.html',
  styleUrls: ['./datamaster.component.css']
})
export class DatamasterComponent implements OnInit {
    displayModal: boolean=false;
    displayBasic: boolean=false;
    displayBasic2: boolean=false;
    displayMaximizable: boolean=false;
    displayPosition: boolean=false;
    position: string='';
    submitted: boolean = false;
    password: string = '';
    username: string = '';
    checkUser: boolean = false;
    userData: any;
    
    valuepass1: string='';
    valuepass2: string='';
    valuepass3: string='';
    valuepass4: string='';
    
    users: any;
    first = 0;
    rows = 10;


  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe((res) => {
      console.log(res.data);
      this.users = res.data;
    });
  }
showModalDialog() {
        this.displayModal = true;
    }

    showBasicDialog() {
      this.displayBasic2=false;
        this.displayBasic = true;
        this.submitted = false;
    }

    showBasicDialog2() {
      this.displayBasic=false;
        this.displayBasic2 = true;
        this.submitted=false;
    }

    showMaximizableDialog() {
        this.displayMaximizable = true;
    }

    showPositionDialog(position: string) {
        this.position = position;
        this.displayPosition = true;
    }

    handleSaveDepartment(event: any) {
    console.log('ini rownya');
    this.submitted = true;
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
        return this.users ? this.first === (this.users.length - this.rows): true;
    }

    isFirstPage(): boolean {
        return this.users ? this.first === 0 : true;
    }
}
