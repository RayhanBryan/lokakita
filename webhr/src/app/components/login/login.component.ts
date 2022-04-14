import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { throws } from 'assert';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password: string = '';
  username: string = '';
  checkUser: boolean = false;
  userData: any;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.router.navigate(['/home']);
    }
  }

  getUser(){
    console.log(this.username, 'getuser')
    try {
      this.userService.getUser(this.username).subscribe(
        res => {
          // console.log(res);
          this.userData = res.data;
          console.log(this.userData, 'dalemgetuser');
          this.login()
        }
      );
    } catch (e: unknown){
      alert("Salah")
    }
  }

  login(): void{
    console.log(this.userData, 'login')
    if (this.userData.username == this.username && this.userData.password == this.password){
      localStorage.setItem('token', 'x')
      localStorage.setItem('name', 'Administrator')
      window.location.reload()
    }
    else {
      alert('Input salah')
    }
  }

  checkUsername(){
    if (this.username.length <= 5){
      this.checkUser = true;
    } else {
      this.checkUser = false;
    }
  }

 
}
