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
    console.log('ini user id: ', localStorage.getItem('items'))
    this.getMenuByUserId(Number(localStorage.getItem('token')));
    // this.items = JSON.parse(localStorage.getItem('items'));
    // this.menuService.getMenu().subscribe(
    //   res => {
    //     for (let i in res.data) {
    //       this.items.push({
    //         label: res.data.menuName,
    //         icon: res.data.icon,
    //         routerLink: res.data.url,
    //         visible: false
    //       })
    //     };
    //     this.getAccessById(Number(localStorage.getItem('token')));
    //   }
    // )
    // this.items = [
    //   {
    //     label: 'Employee',
    //     icon: 'pi pi-users',
    //     routerLink: '/employee',
    //     visible: false
    //   }
    // ]
  }

  getMenuByUserId(id: any) {
    this.menuService.getMenuByUserId(id).subscribe(
      res => {
        res.data.forEach((l: any) => {
          l.label = l.menuName,
            l.icon = l.icon,
            l.routerLink = l.url
        });
        console.log(res.data, ' in res')
        this.items = res.data;
      }
    )
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
            }
          )
        }
      }
    );
  }

}
