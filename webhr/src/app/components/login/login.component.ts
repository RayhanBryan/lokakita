import {
  Component,
  Injectable,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
// import { throws } from 'assert';
import {
  UserService
} from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
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
  userId: any;

  constructor(private app: AppComponent, private router: Router, private userService: UserService, private messageService: MessageService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    this.userService.getByUsername(this.username).subscribe(
      res => {
        this.userData = res.data;
        console.log(this.userData);
        if (this.userData.username == this.username && this.userData.password == this.password) {
          this.successLogin()
          localStorage.setItem('token', this.userData.userId)
          localStorage.setItem('name', 'Administrator')
          window.location.reload()
          return
        }
        this.wrongUser();
      }
    );
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
