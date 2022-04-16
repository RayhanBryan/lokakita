import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
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

  constructor(private router: Router, private userService: UserService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getUser();
    if (localStorage.getItem('token')) {
      this.router.navigate(['/home']);
    }
  }

  getUser() {
    this.userService.getUser().subscribe(
      res => {
        // console.log(res);
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
      }
    };
    console.log(this.newUser)
    this.userService.postUser(this.newUser).subscribe(
      {
        next: (data) => {
          console.log(data)
          if (data.status) {
            this.successSignUp();
            setTimeout(this.doNothing, 3000);
          }
        },
        error: (err) => {
          console.log('tesss', this.newUser, 'dalem error')
          console.log('Error broh')
        }
      }
    );
  }

  // login() {
  //   console.log(this.userData, 'login')
  //   for (let i in this.userData) {
  //     if (this.userData[i].username == this.username && this.userData[i].password == this.password) {
  //       this.successLogin()
  //       localStorage.setItem('token', 'x')
  //       localStorage.setItem('name', 'Administrator')
  //       window.location.reload()
  //       return
  //     }
  //   }
  //   this.wrongUser();
  // }
  doNothing() {
    this.router.navigate(['/login']);
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

}
