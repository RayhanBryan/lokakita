import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  isLoggedIn = localStorage.getItem('token')
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const items: any[] = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items') as any) : [];
    let count = 0;
    items.forEach((l: any) => {
      if (l.url == state.url) {
        count++;
      }
    });
    console.log(state);
    if (this.isLoggedIn) {
      if (count > 0 || state.url == '/home') {
        return true
      }
      else {
        this.router.navigate(['notfound']);
        return false
      }
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
