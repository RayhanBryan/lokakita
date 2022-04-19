import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryComponent } from './components/country/country.component';
import { DatamasterComponent } from './components/datamaster/datamaster.component';
import { DepartmentComponent } from './components/department/department.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { HomeComponent } from './components/home/home.component';
import { JobComponent } from './components/job/job.component';
import { LocationComponent } from './components/location/location.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RegionComponent } from './components/region/region.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuardService] },
  { path: 'department', component: DepartmentComponent, canActivate: [AuthGuardService] },
  { path: 'job', component: JobComponent, canActivate: [AuthGuardService] },
  { path: 'location', component: LocationComponent, canActivate: [AuthGuardService] },
  { path: 'country', component: CountryComponent, canActivate: [AuthGuardService] },
  { path: 'region', component: RegionComponent, canActivate: [AuthGuardService] },
  { path: 'datamaster', component: DatamasterComponent, canActivate: [AuthGuardService] },
  { path: 'notfound', component: NotfoundComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
