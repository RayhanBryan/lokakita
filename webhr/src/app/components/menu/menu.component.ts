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

  constructor(private loginComp: LoginComponent, private app: AppComponent, private messageService: MessageService, private hakAksesService: HakAksesService, private groupService: GroupService, private groupMenu: GroupMenuService, private menuService: MenuService) { }
  items: MenuItem[] = [];

  logout(): void {
    this.messageService.add({ key: 'tc', severity: 'info', summary: 'Goodbye', detail: 'Thank you, see you later' });
    localStorage.clear();
    window.location.reload();
  }
  ngOnInit() {
    console.log('ini user id: ', localStorage.getItem('token'))
    this.getAccessById(localStorage.getItem('token'));
    for (let i in this.dataAccess) {

    }
    this.items = [
      {
        label: 'Employee',
        icon: 'pi pi-spin pi-users',
        routerLink: '/employee',
      },
      {
        label: 'Department',
        icon: 'pi pi-spin pi-building',
        routerLink: '/department'
      },
      {
        label: 'Job',
        icon: 'pi pi-spin pi-briefcase',
        routerLink: '/job'
      },
      {
        label: 'Location',
        icon: 'pi pi-spin pi-slack',
        routerLink: '/location'
      },
      {
        label: 'Country',
        icon: 'pi pi-spin pi-globe',
        routerLink: '/country'
      },
      {
        label: 'Region',
        icon: 'pi pi-spin pi-compass',
        routerLink: '/region'
      },
      {
        label: 'Data Master',
        icon: 'pi pi-spin pi-user-plus',
        routerLink: '/datamaster'
      },

    ];
  }

  getAccessById(id: any) {
    this.hakAksesService.getAccessById(id).subscribe(
      res => {
        this.dataAccess = res.data;
        console.log(res.data)
      }
    );
  }

}
