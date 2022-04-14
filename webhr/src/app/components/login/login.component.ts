import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.router.navigate(['/home']);
    }
  }

  login(): void{
    localStorage.setItem('token', 'x')
    localStorage.setItem('name', 'Administrator')
    window.location.reload()
  }

}
