import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenubarModule } from 'primeng/menubar';
import { EmployeeComponent } from './components/employee/employee.component';
import { DepartmentComponent } from './components/department/department.component';
import { JobComponent } from './components/job/job.component';
import { LocationComponent } from './components/location/location.component';
import { RegionComponent } from './components/region/region.component';
import { CountryComponent } from './components/country/country.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { SignupComponent } from './components/signup/signup.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { DatamasterComponent } from './components/datamaster/datamaster.component';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DepartmentComponent,
    JobComponent,
    LocationComponent,
    EmployeeComponent,
    RegionComponent,
    CountryComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    DatamasterComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    MenubarModule,
    TabMenuModule,
    TableModule,
    HttpClientModule,
    InputTextModule,
    FormsModule,
    DialogModule,
    BrowserAnimationsModule,
    DropdownModule,
    ConfirmDialogModule,
    ToastModule,
    CardModule,
    PasswordModule,
    InputTextModule,
    CheckboxModule,
    CalendarModule
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
