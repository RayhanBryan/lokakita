import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Timestamp } from 'rxjs';
import { GroupService } from 'src/app/services/group.service';
import { HakAksesService } from 'src/app/services/hakakses.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-datamaster',
  templateUrl: './datamaster.component.html',
  styleUrls: ['./datamaster.component.css'],
  providers: [MessageService]
})

export class DatamasterComponent implements OnInit {
  displayModal: boolean = false;
  displayBasic: boolean = false;
  displayBasic2: boolean = false;
  displayMaximizable: boolean = false;
  displayPosition: boolean = false;
  position: string = '';
  submitted: boolean = false;
  password: string = '';
  username: string = '';
  checkUser: boolean = false;
  userData: any;
  action = 0;
  nama: string = '';
  actions: string = '';
  valuepass1: string = '';
  newPass: string = '';
  confirmNewPass: string = '';
  valuepass4: string = '';
  today: any = new Date();
  userIdxGroup:any;
  users: any;
  first = 0;
  rows = 10;

  showSearch: boolean = false;
  selectedGroup: any[] = [];
  // selectedCategories: any[] = ['Admin', 'User'];
  // categories: any[] = [{ name: 'Admin', key: 'A' }, { name: 'User', key: 'M' }];
  checked: boolean = false;

  groups:any;

  row: any = {
    userId: 0,
    username: '',
    password: '',
    name: '',
    address: '',
    email: '',
    phone: '',
    groupName: [],
    createdDate: '',
    createdBy: '',
  };

  newAccess: any = {
    hakAksesId:'',
    userId: '',
    groupId: '',
    createdBy: '',
    isActive:'',
  }

  groupList: any;


  hakAksess:any;

  name:string='';

  dataUser: any;
  wrongConfirmPassword: boolean = false;
  wrongPassword: boolean = false;

  constructor(private messageService: MessageService, private usersService: UserService, private groupsService: GroupService, private hakAkses: HakAksesService) { }

  ngOnInit(): void {
    this.usersService.getUser().subscribe((res) => {
      console.log(res.data);
      res.data.forEach((row: any) => {
        this.groupsService.getGroupByUserId(row.userId).subscribe((result) => {
          row.groupName = result.data;
          // console.log(this.row.groupName,'getgroupname')
        });
      });
      this.users = res.data;
      console.log(res.data, 'tes');
      console.log(this.selectedGroup,'ini selected group')
    });
    this.usersService.getByUserId(Number(localStorage.getItem('token'))).subscribe(
      res => {
        this.dataUser = res.data;
        console.log(this.dataUser,'getbyuserid')
      }
    )

    this.groupsService.getGroup().subscribe((res)=>{
      this.groups=res.data;
      console.log(this.groups,'groups')
    })
      
    this.hakAkses.getAccess().subscribe((reslt)=>{
      this.newAccess=reslt.data;
      console.log(this.newAccess,'new access')
    })
  }

  dateToString() {
    this.today.dateToString
  }

  showSearchCall() {
    this.showSearch = !this.showSearch;
  }
  showModalDialog() {
    this.displayModal = true;
  }

  showBasicDialog() {
    this.displayBasic2 = false;
    this.displayBasic = true;
    this.submitted = false;
  }

  showBasicDialog2(row:any) {
    this.displayBasic = false;
    this.displayBasic2 = true;
    this.submitted = false;
    this.actions = 'add';
    this.row = { ...row.createdBy };
    this.usersService.getByUserId(Number(localStorage.getItem('token'))).subscribe(
     res => {
      this.name = res.data.name;
       this.row.createdBy= res.data.name;
      }
    )
  }

  showMaximizableDialog(act: any) {
    this.displayMaximizable = true;
  }

  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }

  handleSaveDepartment(event: any) {
    console.log('ini rownya');
    this.submitted = true;
  }

  handleReset(event: any) {
    this.row = {
      userId: 0,
      username: '',
      password: '',
      name: '',
      address: '',
      email: '',
      phone: '',
      groupName: '',
      createdDate: '',
      createdBy: '',
    };
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.users ? this.first === (this.users.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.users ? this.first === 0 : true;
  }

  onChanged() {
    this.usersService.getUsername(this.nama).subscribe(
      res => {
        this.users = res.data;
        console.log(this.users)
      }
    )
  }

  openEdit(row: any) {
    this.displayBasic2 = true;
    this.actions = 'edit';
    this.row = { ...row };
    this.usersService.getByUserId(Number(localStorage.getItem('token'))).subscribe(
      res => {
        this.name = res.data.name;
      }
    )
  }

  getUserIdxGroupId(id:any, groupId:any){
  this.hakAkses.getAccsesByUserIdxGroupId(id, groupId).subscribe((res)=>{
    this.userIdxGroup= res.data;
    console.log(this.userIdxGroup);
  })
  }

  deleteUser(id: any) {
    this.usersService.deleteUser(id).subscribe((res) => {
      console.log(res.data);
      this.users = res.data;
    });
    window.location.reload();
  }

  deleteHakAkses(id:any){
    this.hakAkses.deleteAccess(id).subscribe((res) => {
      console.log(res.data);
      this.hakAksess = res.data;
    });
  }

  submit(): void{
    if(this.row.userId == 0){
      this.row.userId = null;
      this.usersService.postUser(this.row).subscribe({
        next:(data)=>{
          if(data.status){
          console.log(data,'aw');
          }
        },
         error: (err) => {
          console.log('error cuy');
         }
      });
    }
  }



  input(): void {
    if (this.row.userId == 0) {
      this.row.userId = null;
      this.usersService.postUser(this.row).subscribe({
        next: (data) => {
          if (data.status) {
            this.reset;
            this.ngOnInit();
            //test
            this.newAccess.userId = data.data.userId;
            this.newAccess.createdBy = data.data.createdBy;
             for (let i in this.selectedGroup) {
              this.newAccess.groupId = this.selectedGroup[i];
              this.newAccess.isActive = 'Y';
              this.hakAkses.postAccess(this.newAccess).subscribe(
              res => {
                console.log(res, ' ini hasil liopp');
                }
              )
            }
            //test
            this.displayBasic2 = false;
            window.location.reload();
          }
        },
        error: (err) => {
          console.log('error cuy');
        },
      });
    } else {
      console.log(this.row);
      this.usersService.putUser(this.row).subscribe({
        next: (data) => {
          if (data.status) {
            this.reset;
            this.ngOnInit();
            //test
            // this.newAccess.userId = data.data.userId;
            // this.newAccess.createdBy = data.data.createdBy;
            // if((this.selectedGroup[0]=='Admin') && (this.selectedGroup[1]=='User')){
            // for(let i=2; i<=3; i++){
            // this.newAccess.groupId = i;
            // this.hakAkses.putAccess(this.newAccess).subscribe(
            // res => {
            // console.log(res);
            // }
            // )  
            // }
            // }
            // else if((this.selectedGroup[0]=='Admin')&&(this.selectedGroup[1]!='')){
            // this.newAccess.groupId = 2;
            // this.hakAkses.putAccess(this.newAccess.hakAksesId).subscribe(
            // res => {
            // console.log(res);
            // }
            // )
            // }else{
            // this.newAccess.groupId = 3;
            // this.hakAkses.putAccess(this.newAccess).subscribe(
            // res => {
            // console.log(res);
            // }
            // )
            // }
            //test
            this.displayBasic2 = false;
          }
        },
        error: (err) => {
          console.log('error cuy');
          // this.displayBasic = false;
        },
      });
    }
  }
  saveNewPassword() {
    console.log(this.password, ' ini pass lama')
    console.log(this.dataUser, ' ini userdata')
    this.wrongConfirmPassword = false;
    this.wrongPassword = false;
    if (this.dataUser.password == this.password) {
      if (this.newPass == this.confirmNewPass) {
        this.dataUser.password = this.newPass
        this.usersService.putUser(this.dataUser).subscribe(
          res => {
            this.successUpdatePassword();
            this.displayBasic = false;
          }
        );
      } else {
        this.wrongConfirmPassword = true;
      }
    } else {
      this.wrongPassword = true;
    }
  };

  successUpdatePassword() {
    this.messageService.add({ severity: 'success', summary: 'Password Updated', detail: 'Password successfully updated' });
  }
}
