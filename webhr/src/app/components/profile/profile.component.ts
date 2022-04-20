import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'primeng/api';
import { GroupMenuService } from 'src/app/services/group-menu.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit {

  constructor(private groupService: GroupService, private userService: UserService, private messageService: MessageService) { }

  dataUser: any;
  dupUser: any;
  name: string = '';
  username: string = '';
  password: string = '*******';
  email: string = '';
  phone: string = '';
  address: string = '';
  iconPass: string = 'pi pi-eye';
  showPass: boolean = true;
  displayEdit: boolean = false;

  newName: string = '';
  newPassword: string = '';
  newPhone: string = '';
  newAddress: string = '';
  newPasswordInput: string = '';
  confirmNewPass: string = '';
  wrongConfirmPassword: boolean = false;

  groupUser: any;

  headerDialog: string = '';

  inputName: boolean = false;
  inputPhone: boolean = false;
  inputAddress: boolean = false;
  inputPassword: boolean = false;

  ngOnInit(): void {
    this.showData();
  }

  falsingInput() {
    this.inputName = false;
    this.inputPhone = false;
    this.inputAddress = false;
    this.inputPassword = false;
  }

  getGroup() {
    this.groupService.getGroupByUserId(Number(localStorage.getItem('token'))).subscribe(
      res => {
        console.log(res, ' ini res grup')
        this.groupUser = res.data;
      }
    )
  }

  showData() {
    this.getGroup();
    this.userService.getByUserId(Number(localStorage.getItem('token'))).subscribe(
      res => {
        this.dataUser = res.data;
        console.log(this.dataUser);
        this.name = res.data.name
        this.username = res.data.username
        this.email = res.data.email
        this.phone = res.data.phone
        this.address = res.data.address
        this.newName = res.data.name
        this.newPassword = res.data.password
        this.newPhone = res.data.phone
        this.newAddress = res.data.address
      }
    )
  }

  showPassword() {
    if (this.showPass) {
      this.showPass = false
      this.password = this.dataUser.password
      this.iconPass = 'pi pi-eye-slash'
    } else {
      this.showPass = true
      this.password = '*******'
      this.iconPass = 'pi pi-eye'
    }

  }

  postEdit() {
    if (this.newPasswordInput != '') {
      this.newPassword = this.newPasswordInput
      if (this.newPassword == this.confirmNewPass) {
        this.dataUser.password = this.newPassword
        this.userService.putUser(this.dataUser).subscribe(
          res => {
            this.showSuccess();
            this.displayEdit = false;
          }
        );
      } else {
        this.wrongConfirmPassword = true;
      }
    } else {
      this.dataUser.name = this.newName
      this.dataUser.password = this.newPassword
      this.dataUser.phone = this.newPhone
      this.dataUser.address = this.newAddress
      this.userService.postUser(this.dataUser).subscribe(
        res => {
          this.displayEdit = false;
          this.showSuccess();
          this.showData();
          this.newPasswordInput = '';
        }
      )
    }
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data edited' });
  }

}
