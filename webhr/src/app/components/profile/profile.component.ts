import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }

  dataUser: any;
  nama: string = '';
  username: string = '';
  password: string = '';
  email: string = '';

  ngOnInit(): void {
    this.userService.getByUserId(Number(localStorage.getItem('token'))).subscribe(
      res => {
        this.dataUser = res.data;
        console.log(this.dataUser);
        this.nama = res.data.name
      }
    )
  }

}
