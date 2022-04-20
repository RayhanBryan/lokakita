import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Timestamp } from 'rxjs';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-datamaster',
  templateUrl: './datamaster.component.html',
  styleUrls: ['./datamaster.component.css'],
  providers: [MessageService]
})

export class DatamasterComponent implements OnInit {
  displayModal: boolean = false;
  displayBasic: boolean = false;
  displayBasic2: boolean = false;
  displayMaximizable: boolean = false;
  displayPosition: boolean = false;
  position: string = '';
  submitted: boolean = false;
  password: string = '';
  username: string = '';
  checkUser: boolean = false;
  userData: any;
  action = 0;
  nama: string = '';
  actions: string = '';
  valuepass1: string = '';
  newPass: string = '';
  confirmNewPass: string = '';
  valuepass4: string = '';
  today:any = new Date();

  users: any;
  first = 0;
  rows = 10;

  showSearch: boolean = false;
  selectedCities: string[] = [];
  selectedCategories: any[] = ['Technology', 'Sports'];
  categories: any[] = [{ name: 'Admin', key: 'A' }, { name: 'User', key: 'M' }];
  checked: boolean = false;

  row: any = {
    userId: 0,
    username: '',
    password: '',
    name: '',
    address: '',
    email: '',
    phone: '',
    groupName: [],
    createdDate: '',
    createdBy: '',
  };

  dataUser: any;
  wrongConfirmPassword: boolean = false;
  wrongPassword: boolean = false;

  constructor(private messageService: MessageService, private usersService: UserService, private groupsService: GroupService) { }

  ngOnInit(): void {
    this.usersService.getUser().subscribe((res) => {
      console.log(res.data);
      res.data.forEach((row: any) => {
        this.groupsService.getGroupByUserId(row.userId).subscribe((result) => {
          row.groupName = result.data;
          console.log(this.row.groupName, 'fwafaw')
        });
      });
      this.users = res.data;
      console.log(res.data, 'tes');
    });
    this.usersService.getByUserId(Number(localStorage.getItem('token'))).subscribe(
      res => {
        this.dataUser = res.data;
        console.log(this.dataUser)
      }
    )
  }

  dateToString(){
  this.today.dateToString
  }

  showSearchCall() {
    this.showSearch = !this.showSearch;
  }
  showModalDialog() {
    this.displayModal = true;
  }

  showBasicDialog() {
    this.displayBasic2 = false;
    this.displayBasic = true;
    this.submitted = false;
  }

  showBasicDialog2() {
    this.displayBasic = false;
    this.displayBasic2 = true;
    this.submitted = false;
    this.actions = 'add';
  }

  showMaximizableDialog(act: any) {
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

  handleReset(event: any) {
    this.row = {
      userId: 0,
      username: '',
      password: '',
      name: '',
      address: '',
      email: '',
      phone: '',
      groupName: '',
      createdDate: '',
      createdBy: '',
    };
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
    return this.users ? this.first === (this.users.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.users ? this.first === 0 : true;
  }

  onChanged() {
    this.usersService.getUsername(this.nama).subscribe(
      res => {
        this.users = res.data;
        console.log(this.users)
      }
    )
  }

  openEdit(row: any) {
    this.displayBasic2 = true;
    this.actions = 'edit';
    this.row = { ...row };
  }

  deleteUser(id: any) {
    this.usersService.deleteUser(id).subscribe((res) => {
      console.log(res.data);
      this.users = res.data;
    });
    window.location.reload();
  }

  input(): void {
    if (this.row.userId == 0) {
      this.row.userId = null;
      this.usersService.postUser(this.row).subscribe({
        next: (data) => {
          console.log(data);
          if (data.status) {
            this.reset;
            this.ngOnInit();
            this.displayBasic2 = false;
            window.location.reload();
          }
        },
        error: (err) => {
          console.log('error cuy');
        },
      });
    } else {
      console.log(this.row);
      this.usersService.putUser(this.row).subscribe({
        next: (data) => {
          if (data.status) {
            this.reset;
            this.ngOnInit();
            this.displayBasic2 = false;
          }
        },
        error: (err) => {
          console.log('error cuy');
          // this.displayBasic = false;
        },
      });
    }
  }
  saveNewPassword() {
    console.log(this.password, ' ini pass lama')
    console.log(this.dataUser, ' ini userdata')
    this.wrongConfirmPassword = false;
    this.wrongPassword = false;
    if (this.dataUser.password == this.password) {
      if (this.newPass == this.confirmNewPass) {
        this.dataUser.password = this.newPass
        this.usersService.putUser(this.dataUser).subscribe(
          res => {
            this.successUpdatePassword();
            this.displayBasic = false;
          }
        );
      } else {
        this.wrongConfirmPassword = true;
      }
    } else {
      this.wrongPassword = true;
    }
  };

  successUpdatePassword() {
    this.messageService.add({ key: 'tc', severity: 'success', summary: 'Password Updated', detail: 'Password successfully updated' });
  }
}
