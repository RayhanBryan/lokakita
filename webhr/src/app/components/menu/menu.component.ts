import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { GroupMenuService } from 'src/app/services/group-menu.service';
import { GroupService } from 'src/app/services/group.service';
import { HakAksesService } from 'src/app/services/hakakses.service';
import { MenuService } from 'src/app/services/menu.service';
import { LoginComponent } from '../login/login.component';

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

  constructor(private loginComp: LoginComponent, private app: AppComponent, private messageService: MessageService, private hakAksesService: HakAksesService, private groupService: GroupService, private groupMenu: GroupMenuService, private menuService: MenuService) { }
  items: MenuItem[] = [];

  logout(): void {
    this.messageService.add({ key: 'tc', severity: 'info', summary: 'Goodbye', detail: 'Thank you, see you later' });
    localStorage.clear();
    window.location.reload();
  }
  ngOnInit() {
    this.getMenuByUserId(Number(localStorage.getItem('token')));
  }

  getMenuByUserId(id: any) {
    this.menuService.getMenuByUserId(id).subscribe(
      res => {
        res.data.forEach((l: any) => {
          l.label = l.menuName,
            l.icon = l.icon,
            l.routerLink = l.url
        });
        this.items = res.data;
        localStorage.setItem('items', JSON.stringify(res.data))
      }
    )
  }

}
