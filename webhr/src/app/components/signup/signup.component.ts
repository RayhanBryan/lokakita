import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { GroupService } from 'src/app/services/group.service';
import { HakAksesService } from 'src/app/services/hakakses.service';
// import { throws } from 'assert';
import {
  UserService
} from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [MessageService]
})
export class SignupComponent implements OnInit {
  password: string = '';
  username: string = '';
  email: string = '';
  nohp: string = '';
  address: string = '';
  name: string = '';
  checkUser: boolean = false;
  checkEmail: boolean = false;
  mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  userData: any;

  newUser: any = {
    password: '',
    username: '',
    email: '',
    phone: '',
    address: '',
    name: '',
    createdBy: '',
  }

  newAccess: any = {
    userId: '',
    groupId: '',
    createdBy: ''
  }

  newUserValid: boolean = false;

  constructor(private groupService: GroupService, private confirmationService: ConfirmationService, private router: Router, private userService: UserService, private messageService: MessageService, private hakAkses: HakAksesService) { }

  ngOnInit(): void {
    this.getUser();
    if (localStorage.getItem('token')) {
      this.router.navigate(['/home']);
    }
  }

  getUser() {
    this.userService.getUser().subscribe(
      res => {
        this.userData = res.data;
        console.log(this.userData)
      }
    );
  }

  signUp() {
    this.userService.getByUsername(this.username).subscribe(
      res => {
        if (!res.status) {
          if (this.checkUser == true) {
            this.invalidUsername();
            return
          }
          else if (this.checkEmail == true) {
            this.invalidEmail();
            return
          }
          this.userService.getUserByEmail(this.email).subscribe(
            res => {
              console.log(res)
              if (res.status) {
                this.dupEmail();
                return;
              }
              this.newUser.username = this.username;
              this.newUser.password = this.password;
              this.newUser.email = this.email;
              this.newUser.phone = this.nohp;
              this.newUser.address = this.address;
              this.newUser.name = this.name;
              this.newUser.createdBy = this.username;
              console.log(this.newUser, ' ini new user')
              if (
                this.newUser.username != '' &&
                this.newUser.password != '' &&
                this.newUser.email != '' &&
                this.newUser.phone != '' &&
                this.newUser.address != '' &&
                this.newUser.name != ''
              ) {
                this.newUserValid = true;
                this.userService.postUser(this.newUser).subscribe(
                  {
                    next: (data) => {
                      console.log(data)
                      if (data.status) {
                        this.successSignUp();
                        this.groupService.getGroup().subscribe(
                          res => {
                            for (let i in res.data) {
                              this.newAccess.userId = data.data.userId;
                              this.newAccess.createdBy = data.data.createdBy;
                              this.newAccess.groupId = res.data[i].groupId;
                              if (res.data[i].groupId == 3) {
                                this.newAccess.isActive = 'Y'
                              } else {
                                this.newAccess.isActive = 'N'
                              }
                              console.log(this.newAccess)
                              this.hakAkses.postAccess(this.newAccess).subscribe(
                                res => {
                                  console.log(res);
                                }
                              )
                            }
                            this.toLogin();
                          }
                        )
                        return
                      }
                    },
                    error: (err) => {
                      this.invalidSignUp();
                      return
                    }
                  }
                );
              }
              // this.invalidSignUp();
            }
          )
        } else {
          this.dupUsername();
          return
        }
        console.log(this.newUser)
      }
    )


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

  dupUsername() {
    this.messageService.add({ key: 'tc', severity: 'error', summary: 'Sorry', detail: 'Username already exist' });
  }

  dupEmail() {
    this.messageService.add({ key: 'tc', severity: 'error', summary: 'Sorry', detail: 'Email already exist' });
  }

  successSignUp() {
    this.messageService.add({ key: 'tc', severity: 'success', summary: 'Congratulations', detail: 'You can login now' });
  }

  invalidSignUp() {
    this.messageService.add({ key: 'tc', severity: 'error', summary: 'Sorry', detail: 'There are some invalid data' });
  }

  invalidUsername() {
    this.messageService.add({ key: 'tc', severity: 'error', summary: 'Sorry', detail: 'Please type a valid username' });
  }

  invalidEmail() {
    this.messageService.add({ key: 'tc', severity: 'error', summary: 'Sorry', detail: 'Please type a valid email' });
  }

}
