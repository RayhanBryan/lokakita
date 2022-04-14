import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryComponent } from './components/country/country.component';
import { DepartmentInputComponent } from './components/department-input/department-input.component';
import { DepartmentComponent } from './components/department/department.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { HomeComponent } from './components/home/home.component';
import { JobComponent } from './components/job/job.component';
import { LocationComponent } from './components/location/location.component';
import { LoginComponent } from './components/login/login.component';
import { RegionComponent } from './components/region/region.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path:'employee', component: EmployeeComponent, canActivate: [AuthGuardService]},
  {path:'department', component: DepartmentComponent, canActivate: [AuthGuardService],
    children: [
      {
        path: 'input', component: DepartmentInputComponent
      }
    ]
  },
  {path:'job', component: JobComponent, canActivate: [AuthGuardService]},
  {path:'location', component: LocationComponent, canActivate: [AuthGuardService]},
  {path:'country', component: CountryComponent, canActivate: [AuthGuardService]},
  {path:'region', component: RegionComponent, canActivate: [AuthGuardService]},
  {path:'', redirectTo:'/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
