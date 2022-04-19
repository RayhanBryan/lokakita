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
  checkUser: boolean = false;
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

  getAccessById(id: any) {
    this.hakAksesService.getAccessById(id).subscribe(
      res => {
        this.dataAccess = res.data;
        console.log(res.data, ' ini object tidak diketahui');
        for (let i in this.dataAccess) {
          console.log(this.dataAccess[i].groupId, 'ini apa sih')
          this.groupMenu.getByGroupId(this.dataAccess[i].groupId).subscribe(
            res => {
              this.dataMenu = res.data;
              console.log(this.dataMenu, 'ini datamenu')
              for (let i in res.data) {
                this.penampungMenuId.push(res.data[i].menuId)
                console.log(this.penampungMenuId, ' ini penampung menu id')
              }
              this.penampungMenuId = [...new Set(this.penampungMenuId)]
              this.penampungMenuId.sort();
              for (let i in this.penampungMenuId.sort()) {
                this.menuService.getMenuById(this.penampungMenuId[i]).subscribe(
                  res => {
                    console.log(res, 'ini res menu')
                    this.items.push({
                      label: res.data.menuName,
                      icon: res.data.icon,
                      routerLink: res.data.url,
                    })
                  }
                )
              }
              let itemString = JSON.stringify(this.items)
              localStorage.setItem('items', itemString)
              window.location.reload()
            }
          )
        }

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
