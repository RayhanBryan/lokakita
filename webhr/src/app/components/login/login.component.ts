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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  password: string = '';
  username: string = '';
  checkUser: boolean = false;
  userData: any;

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
      }
    );
  }

  login() {
    console.log(this.userData, 'login')
    for (let i in this.userData) {
      if (this.userData[i].username == this.username && this.userData[i].password == this.password) {
        this.successLogin()
        localStorage.setItem('token', 'x')
        localStorage.setItem('name', 'Administrator')
        window.location.reload()
        return
      }
    }
    this.wrongUser();
  }

  checkUsername() {
    if (this.username.length <= 5) {
      this.checkUser = true;
    } else {
      this.checkUser = false;
    }
  }

  wrongUser() {
    this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Sorry', detail: 'Wrong username or password' });
  }

  successLogin() {
    this.messageService.add({ key: 'tc', severity: 'success', summary: 'Welcome', detail: 'Login success' });
  }

}
