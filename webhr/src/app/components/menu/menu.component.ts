import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [MessageService]
})
export class MenuComponent implements OnInit {

  constructor(private messageService: MessageService) { }
  items: MenuItem[] = [];

  logout(): void {
    this.messageService.add({ key: 'tc', severity: 'info', summary: 'Goodbye', detail: 'Thank you, see you later' });
    localStorage.clear();
    window.location.reload();
  }
  ngOnInit() {
    this.items = [
      {
        label: 'Employee',
        icon: 'pi pi-spin pi-users',
        routerLink: '/employee',
        // items:[
        //     {
        //         label:'New',
        //         icon:'pi pi-fw pi-plus',
        //         items:[
        //         {
        //             label:'Bookmark',
        //             icon:'pi pi-fw pi-bookmark'
        //         },
        //         {
        //             label:'Video',
        //             icon:'pi pi-fw pi-video'
        //         },

        //         ]
        //     },
        //     {
        //         label:'Delete',
        //         icon:'pi pi-fw pi-trash'
        //     },
        //     {
        //         separator:true
        //     },
        //     {
        //         label:'Export',
        //         icon:'pi pi-fw pi-external-link'
        //     }
        // ]
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
}
