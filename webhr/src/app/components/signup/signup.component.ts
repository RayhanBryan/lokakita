import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
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

  newUserValid: boolean = false;

  constructor(private confirmationService: ConfirmationService, private router: Router, private userService: UserService, private messageService: MessageService, private hakAkses: HakAksesService) { }

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
    for (let i in this.userData) {
      if (this.userData[i].username == this.username && this.checkUser == false) {
        this.dupUsername();
        return;
      }
      else if (this.userData[i].email == this.email && this.checkEmail == false) {
        this.dupEmail();
        return;
      }
      else {
        this.newUser.username = this.username;
        this.newUser.password = this.password;
        this.newUser.email = this.email;
        this.newUser.phone = this.nohp;
        this.newUser.address = this.address;
        this.newUser.name = this.name;
        this.newUser.createdBy = this.username;
        if (
          this.newUser.username != '' &&
          this.newUser.password != '' &&
          this.newUser.email != '' &&
          this.newUser.phone != '' &&
          this.newUser.address != '' &&
          this.newUser.name != ''
        ) {
          this.newUserValid = true;
        }
      }
    };
    console.log(this.newUser)
    this.userService.postUser(this.newUser).subscribe(
      {
        next: (data) => {
          console.log(data)
          if (data.status) {

            this.successSignUp();
          }
        },
        error: (err) => {
          this.invalidSignUp();
        }
      }
    );
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
    if (this.username.length <= 5) {
      this.checkUser = true;
    } else {
      this.checkUser = false;
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

}
