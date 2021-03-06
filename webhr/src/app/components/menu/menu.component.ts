import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { GroupMenuService } from 'src/app/services/group-menu.service';
import { GroupService } from 'src/app/services/group.service';
import { HakAksesService } from 'src/app/services/hakakses.service';
import { MenuService } from 'src/app/services/menu.service';
import { LoginComponent } from '../login/login.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [MessageService]
})



export class MenuComponent implements OnInit {

  dataAccess: any;
  dataMenu: any;
  penampungMenuId: any[] = [];
  show: boolean = true;
  visibleSidebar: any;
  dataUser: any;
  name: string = '';

  isManage: boolean = false;
  isView: boolean = false;

  constructor(private userService: UserService, private router: Router, private loginComp: LoginComponent, private app: AppComponent, private messageService: MessageService, private hakAksesService: HakAksesService, private groupService: GroupService, private groupMenu: GroupMenuService, private menuService: MenuService) { }
  items: MenuItem[] = [];
  profiles: MenuItem[] = [];
  logout(): void {
    this.messageService.add({ key: 'tc', severity: 'info', summary: 'Goodbye', detail: 'Thank you, see you later' });
    localStorage.clear();
    window.location.reload()
  }
  ngOnInit() {
    this.profiles = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        routerLink: 'profile'
      },
      {
        label: 'Log Out',
        icon: 'pi pi-power-off',
        command: () => this.logout()
      }
    ]
    console.log(localStorage.getItem('token'), 'ini user id');
    this.getActiveMenuByUserId(Number(localStorage.getItem('token')));
    this.userService.getByUserId(Number(localStorage.getItem('token'))).subscribe(
      res => {
        this.name = res.data.name;
        console.log(res.data, ' ini user')
      }
    )
  }

  getActiveMenuByUserId(id: any) {
    this.menuService.getActiveMenuByUserId(id).subscribe(
      res => {
        res.data.forEach((l: any) => {
          l.label = l.menuName,
            l.icon = l.icon,
            l.routerLink = l.url
        });
        this.items = res.data;
        // console.log(this.items, ' ini items')
        localStorage.setItem('items', JSON.stringify(res.data))
      }
    )
  }

  changeVisible() {
    this.visibleSidebar = !this.visibleSidebar;
  }

}
