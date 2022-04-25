import {
  Component,
  Injectable,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import { ConfirmationService, ConfirmEventType, MenuItem, MessageService } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { GroupMenuService } from 'src/app/services/group-menu.service';
import { HakAksesService } from 'src/app/services/hakakses.service';
import { MenuService } from 'src/app/services/menu.service';
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
  userData: any;
  userId: any;

  constructor(private menuService: MenuService, private groupMenu: GroupMenuService, private hakAksesService: HakAksesService, private app: AppComponent, private router: Router, private userService: UserService, private messageService: MessageService) { }

  dataAccess: any;
  dataMenu: any;
  penampungMenuId: any[] = [];
  items: MenuItem[] = [];

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    this.userService.getByUsername(this.username).subscribe(
      res => {
        this.userData = res.data;
        console.log(this.userData, 'ini user data')
        if (res.status) {
          if (this.userData.password == this.password) {
            console.log(this.userData.permissions)
            for (let i in this.userData.permissions) {
              if (this.userData.permissions[i] == 'LOGIN') {
                this.successLogin()
                localStorage.setItem('token', this.userData.userId)
                localStorage.setItem('name', 'Administrator')
                for (let i in this.userData.permissions) {
                  if (this.userData.permissions[i] == 'VIEW') {
                    localStorage.setItem('isView', 'true');
                  }
                  if (res.data.permissions[i] == 'MANAGE') {
                    localStorage.setItem('isManage', 'true');
                  }
                }
                window.location.reload()
                return
              }
            }
            this.loginDenied();
          } else {
            this.wrongUser();
          }
        } else {
          this.wrongUser();
        }
      }
    );
  }


  wrongUser() {
    this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Sorry', detail: 'Wrong username or password' });
  }

  successLogin() {
    this.messageService.add({ key: 'tc', severity: 'success', summary: 'Welcome', detail: 'Login success' });
  }

  loginDenied() {
    this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Sorry', detail: 'You are not allowed to login' });
  }
}
