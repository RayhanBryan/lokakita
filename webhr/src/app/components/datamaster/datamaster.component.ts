import {
  Component,
  OnInit
} from '@angular/core';
import {
  Data,
  Router
} from '@angular/router';
import {
  ConfirmationService,
  MessageService
} from 'primeng/api';
import {
  retry
} from 'rxjs';
import {
  GroupService
} from 'src/app/services/group.service';
import {
  HakAksesService
} from 'src/app/services/hakakses.service';
import {
  UserService
} from 'src/app/services/user.service';



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

  arrayGroup: any[] = [];
  arrayGroupIsActive: any[] = [];
  name: string = '';

  dataUser: any;
  wrongConfirmPassword: boolean = false;
  wrongPassword: boolean = false;

  constructor(private messageService: MessageService,
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
      // console.log(this.users, 'tes');
    });

    this.usersService.getByUserId(Number(localStorage.getItem('token'))).subscribe(
      res => {
        this.dataUser = res.data;
        // console.log(this.dataUser, 'getbyuserid')
      }
    )

    this.groupsService.getGroup().subscribe((res) => {
      this.groups = res.data;
      // console.log(this.groups, 'groups')
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
        this.name = res.data.name;
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
    this.row = {
      ...row
    };
    this.usersService.getByUserId(Number(localStorage.getItem('token'))).subscribe(
      res => {
        this.name = res.data.name;
      }
    )
  }

  getUserIdxGroupId(id: any, groupId: any) {
    this.hakAkses.getAccsesByUserIdxGroupId(id, groupId).subscribe((res) => {
      this.userIdxGroup = res.data;
      console.log(this.userIdxGroup);
    })
  }

  putHakAkses(id: any, gId: any, isActive: string) {
    this.hakAkses.putAccessIsActive(id, gId, isActive).subscribe((res) => {
      this.putIsActive = res.data;
      console.log(this.putIsActive);
    })
  }

  deleteUser(id: any) {
    this.usersService.deleteUser(id).subscribe((res) => {
      console.log(res.data);
      this.users = res.data;
    });
    window.location.reload();
  }

  submit(): void {
    this.usersService.postUser(this.row).subscribe({
      next: (data) => {
        // console.log(data, 'inidata')
        if (data.status) {
          this.newAccess.userId = data.data.userId;
          // console.log(data.data.userId, 'iniapa');
          this.newAccess.createdBy = data.data.createdBy;
          for (let i = 0; i < this.selectedGroup.length; i++) {
            this.newAccess.groupId = this.selectedGroup[i];
            this.newAccess.isActive = 'Y';
            this.hakAkses.postAccess(this.newAccess).subscribe(
              res => {
                console.log(res);
              }
            )
          }
          this.displayBasic2 = false;
          window.location.reload();
        }
      },
      error: (err) => {
        console.log('error cuy');
      },
    });
  }

  input(): void {
    this.usersService.postUser(this.row).subscribe({
      next: (data) => {
        // console.log(data, 'inidata')
        if (data.status) {
          this.newAccess.userId = data.data.userId;
          // console.log(data.data.userId, 'iniapa');
          this.newAccess.createdBy = data.data.createdBy;
          for (let i = 0; i < this.selectedGroup.length; i++) {
            this.newAccess.groupId = this.selectedGroup[i];
            this.hakAkses.postAccess(this.newAccess).subscribe(
              res => {
                console.log(res);
              }
            )
          }
          this.displayBasic2 = false;
          window.location.reload();
        }
      },
      error: (err) => {
        console.log('error cuy');
      },
    });
  }

  edit() {
    this.usersService.putUser(this.row).subscribe({
      next: (data) => {
        if (data.status) {
          this.newAccess.userId = this.row.userId;
          this.groupsService.getGroup().subscribe((res) => {
            this.groups = res.data;
            for (let i = 0; i < this.groups.length; i++) {
              this.arrayGroup[i] = this.groups[i].groupId;
            }
            // console.log(this.arrayGroup, 'ini array group id')
            for (let i = 0; i < this.selectedGroup.length; i++) {
              for (let j = 0; j < this.arrayGroup.length; j++) {
                if (this.selectedGroup[i] == this.arrayGroup[j]) {
                  this.newAccess.groupId = this.selectedGroup[i];
                  this.newAccess.isActive = 'Y';                  
                } else {
                  this.newAccess.groupId = this.arrayGroup[j];
                  this.newAccess.isActive = 'N';
                }
                if (this.selectedGroup[i] == this.arrayGroup[j]) {
                  this.hakAkses.putAccessIsActive(this.newAccess.userId, this.newAccess.groupId, this.newAccess.isActive).subscribe({
                    next: data => {
                      if (data.status) {
                        console.log('Mantapbos')
                      }
                    }
                  })
                }
              }
            }
          })
          console.log(this.selectedGroup, 'ini');
          // this.displayBasic2 = false;
          // window.location.reload();
        }
      },
      error: (err) => {
        console.log('error cuy');
      },
    });
  }

  editTest() {
    this.usersService.putUser(this.row).subscribe({
      next: (data) => {
        if (data.status) {
          this.newAccess.userId = this.row.userId;
          this.groupsService.getGroupByUserId(this.row.userId).subscribe((result) => {
            this.newAccess.groupId = result.data;
            this.hakAkses.getAccessById(this.row.userId).subscribe((resu) => {
              this.bro = resu.data;
              for (let i = 0; i < this.bro.length; i++) {
                this.arrayGroupIsActive[i] = this.bro[i].isActive;
                this.arrayGroup[i] = this.bro[i].groupId;
              }
              console.log(this.arrayGroup, 'yooo')
              console.log(this.arrayGroupIsActive, 'kwkw')
              for (let i = 0; i < this.selectedGroup.length; i++) {
                for (let j = 0; j < this.arrayGroup.length; j++) {
                  if (this.selectedGroup[i] == this.arrayGroup[j]) {
                    this.newAccess.groupId = this.selectedGroup[i];
                    this.newAccess.isActive = 'Y';
                    console.log('Ini : Y');
                    if (this.selectedGroup[i] == this.arrayGroup[j]) {
                      this.hakAkses.putAccessIsActive(this.newAccess.userId, this.newAccess.groupId, this.newAccess.isActive).subscribe({
                        next: data => {
                          if (data.status) {
                            console.log('Mantapbos')
                          }
                        }
                      })
                    }
                  } else {
                    this.newAccess.groupId = this.arrayGroup[j];
                    this.newAccess.isActive = 'N';
                    console.log('Ini : N');
                    if (this.selectedGroup[i] == this.arrayGroup[j]) {
                      this.hakAkses.putAccessIsActive(this.newAccess.userId, this.newAccess.groupId, this.newAccess.isActive).subscribe({
                        next: data => {
                          if (data.status) {
                            console.log('Mantapbos')
                          }
                        }
                      })
                    }
                  }

                }
              }

            })

          })
          console.log(this.selectedGroup, 'ini');
          // this.displayBasic2 = false;
          // window.location.reload();
        }
      },
      error: (err) => {
        console.log('error cuy');
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
                            console.log(res.data);
                          }                        
                        }
                        window.location.reload();
                        return
                      }
                    )

                  }
                },
                error: (err) => {
                }
              })
            }
          }
        )
      }
    })
  }

  editUser(){
    this.usersService.putUser(this.row).subscribe({
      next: (data) => {
        console.log(data)
        if (data.status) {
          this.successSignUp();
          this.groupsService.getGroup().subscribe(
            res => {
              if (this.selectedGroup.length != res.data.length) {                
                for (let i = 0; i < res.data.length; i++) {
                  if (this.selectedGroup[i] == undefined) {
                    this.newAccess.userId = data.data.userId;
                    this.newAccess.createdBy = data.data.createdBy;
                    this.newAccess.groupId = res.data[i].groupId;
                    this.newAccess.isActive = 'N';
                    this.hakAkses.putAccessIsActive(this.newAccess.userId, this.newAccess.groupId, this.newAccess.isActive).subscribe(
                      res => {
                        console.log(res);
                      }
                    )
                  } else {
                    this.newAccess.groupId = this.selectedGroup[i];
                    this.newAccess.userId = data.data.userId;
                    this.newAccess.createdBy = data.data.createdBy;
                    this.newAccess.isActive = 'Y';
                    this.hakAkses.putAccessIsActive(this.newAccess.userId, this.newAccess.groupId, this.newAccess.isActive).subscribe(
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
                  this.hakAkses.putAccessIsActive(this.newAccess.userId, this.newAccess.groupId, this.newAccess.isActive).subscribe(
                    res => {
                      console.log(res);
                    }
                  )
                  console.log(res.data);

                }
              }
              // window.location.reload();
              return
            }
          )

        }
      },
      error: (err) => {
      }
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

}
