import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import {GroupService} from 'src/app/services/group.service';
import {HakAksesService} from 'src/app/services/hakakses.service';
import {UserService} from 'src/app/services/user.service';



@Component({
  selector: 'app-datamaster',
  templateUrl: './datamaster.component.html',
  styleUrls: ['./datamaster.component.css'],
  providers: [ConfirmationService, MessageService]
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
  address: string = '';
  phoneNumber: string = '';
  checkUser: boolean = false;
  checkEmail: boolean = false;
  mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  userData: any;

  email: string = '';
  action = 0;
  nama: string = '';
  actions: string = '';
  valuepass1: string = '';
  newPass: string = '';
  confirmNewPass: string = '';
  valuepass4: string = '';
  today: any = new Date();
  userIdxGroup: any;
  users: any;
  first = 0;
  rows = 10;

  showSearch: boolean = false;
  selectedGroup: any[] = [];
  checked: boolean = false;

  submitEdit: boolean = false;
  submitAdd: boolean = false;

  newUserValid: boolean = false;

  groups: any;

  row: any = {
    // userId: 0,
    username: '',
    password: '',
    name: '',
    address: '',
    email: '',
    phone: '',
    groupName: [],
    createdBy: '',
    permissions: [],
    menus: [],
  };

  newAccess: any = {
    userId: '',
    groupId: '',
    createdBy: '',
    createdDate: '',
    isActive: '',
  }

  bro: any;
  editGroups: any;

  groupList: any;

  putIsActive: any;

  hakAksess: any;
  
  keyword:string='';

  arrayGroup: any[] = [];
  arrayGroupIsActive: any[] = [];
  name: string = '';

  dataUser: any;
  wrongConfirmPassword: boolean = false;
  wrongPassword: boolean = false;

  constructor(
    private messageService: MessageService,
    private usersService: UserService,
    private groupsService: GroupService,
    private hakAkses: HakAksesService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usersService.getUser().subscribe((res) => {
      console.log(res.data, 'ini apaa11');
      res.data.forEach((row: any) => {
        this.groupsService.getGroupByUserId(row.userId).subscribe((result) => {
          row.groupName = result.data;
        });
      });
      this.users = res.data;
    });

    this.usersService.getByUserId(Number(localStorage.getItem('token'))).subscribe(
      res => {
        this.dataUser = res.data;
      }
    )

    this.groupsService.getGroup().subscribe((res) => {
      this.groups = res.data;
    })
  }

  getUsers(){
    this.usersService.getUser().subscribe((res)=>{
      this.users=res.data;
    })
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

  showBasicDialog2(row: any) {
    this.displayBasic = false;
    this.displayBasic2 = true;
    this.submitted = false;
    this.actions = 'add';
    this.row = {
      ...row.createdBy
    };
    this.usersService.getByUserId(Number(localStorage.getItem('token'))).subscribe(
      res => {
        this.row.createdBy = res.data.name;
      }
    )
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
      createdBy: ''
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
    if (this.users!=null){
      if(this.users.length<this.rows){
        return true;
      }
      else{
        return (this.users.length-this.first<=this.rows);
      }
    }
    return true;
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
    this.row = {
      ...row
    };
    this.usersService.getByUserId(Number(localStorage.getItem('token'))).subscribe(
      res => {
        this.name = res.data.name;
      }
    )
  }

  handleDelete(value: Event) {
    this.confirmationService.confirm({
      target: value.target ? value.target : undefined,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(value).subscribe((res) => {
          console.log(res);
          this.getUsers();
          this.messageService.add({
            severity: 'success',
            summary: 'Delete',
            detail: 'Data has been deleted',
          });
        });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'info',
              summary: 'Cancelled',
              detail: 'Your data is safe',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'info',
              summary: 'Cancelled',
              detail: 'Your data is safe',
            });
            break;
        }
      },
    });
  }

  newUser() {
    this.usersService.getByUsername(this.username).subscribe((res) => {
      if (!res.status) {
        if (this.checkUser == true) {
          this.invalidUsername();
          return
        } else if (this.checkEmail == true) {
          this.invalidEmail();
          return
        }
        this.usersService.getUserByEmail(this.email).subscribe(
          res => {
            console.log(res)
            if (res.status) {
              this.dupEmail();
              return;
            }
            this.row.username = this.username;
            this.row.password = this.password;
            this.row.email = this.email;
            this.row.phone = this.phoneNumber;
            this.row.address = this.address;
            this.row.name = this.name;
            this.row.createdBy = this.username;
            if (this.row.username != '' && this.row.password != '' &&
              this.row.email != '' &&
              this.row.phone != '' &&
              this.row.address != '' &&
              this.row.name != '') {
              this.newUserValid = true;
              this.usersService.postUser(this.row).subscribe({
                next: (data) => {
                  console.log(data)
                  if (data.status) {
                    this.groupsService.getGroup().subscribe(
                      res => {
                        if (this.selectedGroup.length != res.data.length) {
                          for (let i = 0; i < res.data.length; i++) {
                            if (this.selectedGroup[i] == undefined) {
                              this.newAccess.userId = data.data.userId;
                              this.newAccess.createdBy = data.data.createdBy;
                              this.newAccess.groupId = res.data[i].groupId;
                              this.newAccess.isActive = 'N';
                              this.hakAkses.postAccess(this.newAccess).subscribe(
                                res => {
                                  console.log(res);
                                }
                              )
                            } else {
                              this.newAccess.userId = data.data.userId;
                              this.newAccess.createdBy = data.data.createdBy;
                              this.newAccess.groupId = this.selectedGroup[i];
                              this.newAccess.isActive = 'Y';
                              this.hakAkses.postAccess(this.newAccess).subscribe(
                                res => {
                                  console.log(res);
                                }
                              )
                            }
                          }
                        } else {
                          for (let i = 0; i < res.data.length; i++) {
                            this.newAccess.userId = data.data.userId;
                            this.newAccess.createdBy = data.data.createdBy;
                            this.newAccess.groupId = res.data[i].groupId;
                            this.newAccess.isActive = 'Y'
                            console.log(this.newAccess)
                            this.hakAkses.postAccess(this.newAccess).subscribe(
                              res => {
                                console.log(res);
                              }
                            )
                          }
                        }
                        setInterval(function () {
                          window.location.reload();
                        }, 5000);
                        return
                      }
                    )
                  }
                },
                error: (err) => {}
              })
            }
          }
        )
      }
    })
  }

  editUser() {
    this.usersService.putUser(this.row).subscribe({
      next: (data) => {
        console.log(data)
        if (data.status) {
          this.successSignUp();
          this.groupsService.getGroup().subscribe(
            res => {
              this.groupsService.getGroupByUserId(this.row.userId).subscribe(result => {
                console.log(result.data, 'weew')
                if (result.data.length != 0) {
                  for (let i = 0; i < result.data.length; i++) {
                    if (this.selectedGroup[i] != undefined) {
                      console.log(result.data[i].groupId, 'isi arraynya')
                      this.newAccess.userId = data.data.userId;
                      this.newAccess.groupId = result.data[i].groupId;
                      // this.newAccess.issActive = 'Y';
                      this.hakAkses.putUserxGroupId(this.newAccess.userId, this.newAccess.groupId).subscribe(
                        res => {
                          console.log(res);
                        }
                      )
                    }
                  }
                  for (let j = 0; j < this.selectedGroup.length; j++) {
                    if (this.selectedGroup[j] != undefined) {
                      this.newAccess.userId = data.data.userId;
                      this.newAccess.groupId = this.selectedGroup[j];
                      // this.newAccess.isActive = 'N';
                      this.hakAkses.putUserxGroupId(this.newAccess.userId, this.newAccess.groupId).subscribe(
                        res => {
                          console.log(res);
                        }
                      )
                    }
                  }
                } else {
                  for (let j = 0; j < this.selectedGroup.length; j++) {
                    if (this.selectedGroup[j] != undefined) {
                      this.newAccess.userId = data.data.userId;
                      this.newAccess.groupId = this.selectedGroup[j];
                      // this.newAccess.isActive = 'N';
                      this.hakAkses.putUserxGroupId(this.newAccess.userId, this.newAccess.groupId).subscribe(
                        res => {
                          console.log(res);
                        }
                      )
                    }
                  }
                }
              })
              return
            }
          )
        }
      },
      error: (err) => {}
    })
  }

  toLogin() {
    console.log(this.newUserValid)
    if (this.newUserValid) {
      this.confirmationService.confirm({
        message: 'Do you want to login now?',
        header: 'Login now?',
        icon: 'pi pi-sign-in',
        accept: () => {
          this.router.navigate(['/login']);
        },
        reject: () => {
          window.location.reload();
        }
      });
    }
  }

  checkUsername() {
    if (this.username.length >= 5) {
      this.checkUser = false;
    } else {
      this.checkUser = true;
    }
  }

  checkEmailFunc() {
    if (this.email.match(this.mailformat)) {
      this.checkEmail = false;
    } else {
      this.checkEmail = true;
    }
  }

  invalidUsername() {
    this.messageService.add({
      key: 'tc',
      severity: 'error',
      summary: 'Sorry',
      detail: 'Please type a valid username'
    });
  }

  invalidEmail() {
    this.messageService.add({
      key: 'tc',
      severity: 'error',
      summary: 'Sorry',
      detail: 'Please type a valid email'
    });
  }

  dupEmail() {
    this.messageService.add({
      key: 'tc',
      severity: 'error',
      summary: 'Sorry',
      detail: 'Email already exist'
    });
  }

  successSignUp() {
    this.messageService.add({
      key: 'tc',
      severity: 'success',
      summary: 'Congratulations',
      detail: 'You can login now'
    });
  }

  invalidSignUp() {
    this.messageService.add({
      key: 'tc',
      severity: 'error',
      summary: 'Sorry',
      detail: 'There are some invalid data'
    });
  }

  searchOption: string = 'username';
  searchOptions = [
    { label: 'search by username', value: 'username' },
    { label: 'search by email', value: 'email' },
    { label: 'search by group', value: 'group' },
  ];
  search() {
    switch (this.searchOption) {
      case 'username':
        this.searchByUsername();
        break;
      case 'email':
        this.searchByEmail();
        break;
      case 'group':
        this.searchByGroup();
        break;
    }
  }

  searchByEmail() {
    this.usersService.getUserByEmail(this.keyword).subscribe({
      next: (data: any) => {
        if (data.data.length == 0) {
        }
        this.users = data.data;
      },
      error: (err) => {},
    });
  }

  searchByUsername() {
    this.usersService.getByUsername(this.keyword).subscribe({
      next: (data: any) => {
        // if (data.data.length == 0) {
        // }
        this.users = data.data;
      },
      error: (err) => {},
    });
  }
  searchByGroup() {
    this.hakAkses.getByGroupName(this.keyword).subscribe({
      next: (data: any) => {
        if (data.data.length == 0) {
        }
        this.groups = data.data;
      },
      error: (err) => {},
    });
  }
}
