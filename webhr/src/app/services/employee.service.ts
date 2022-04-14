import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const url: string = environment.url;
const httpOptions = {
  headers: new HttpHeaders({
    'Accept' : 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  getEmployee(): Observable<any> {
    return this.http.get<any>(url+`employees/findAll`, {
      responseType: 'json'
    });
  }
}
