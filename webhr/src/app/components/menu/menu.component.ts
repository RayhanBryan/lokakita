import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    items: MenuItem[] = [];

    logout(): void {
      localStorage.clear();
      window.location.reload();
    }
    ngOnInit() {
        this.items = [
            {
              label: 'Web HR Batch #7',
            },
            {
                label:'Employee',
                icon:'pi pi-spin pi-users',
                routerLink:'/employee',
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
                label:'Department',
                icon:'pi pi-spin pi-home',
                routerLink: '/department'
            },
            {
                label:'Job',
                icon:'pi pi-spin pi-sync',
                routerLink: '/job'
            },
            {
                label:'Location',
                icon:'pi pi-spin pi-slack',
                routerLink: '/location'
            },
            {
              label:'Country',
              icon:'pi pi-spin pi-globe',
              routerLink: '/country'
          },
          {
            label:'Region',
            icon:'pi pi-spin pi-compass',
            routerLink: '/region'
        },
        ];
    }
}
