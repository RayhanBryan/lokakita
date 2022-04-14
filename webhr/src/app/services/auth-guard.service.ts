import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  isLoggedIn = localStorage.getItem('token')
  constructor(private router: Router) { }

  canActivate(): boolean {
    if(this.isLoggedIn){
      return true
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
