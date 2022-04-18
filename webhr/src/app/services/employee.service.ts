import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
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
  private _url: string =  "http://localhost:9090/employees/findAll"
  private _baseUrl: string = environment.url;

  constructor(private http: HttpClient) { }
  getEmployee(): Observable<any> {
    // return this.http.get<any>(this._url, httpOptions).pipe(map((data: any) => (data.data || data)));
    return this.http.get<any>(url + 'employees/findAll', {responseType: 'json',});
  }

  getEmployeeName(name: string): Observable<any> {
    return this.http.get<any>(this._baseUrl+`/employees/findByFirstName?firstName=${name}&page=0&size=20`, { responseType: 'json' }).pipe(map((data: any) => (data.data || data)));
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get<any>(this._baseUrl + `employees/GetById?id=${id}`, httpOptions);
  }

  postEmployee(req:any): Observable<any> {
    return this.http.post<any>(this._baseUrl+ 'employees/post', req, httpOptions);
  }
  
  putEmployee(data: any): Observable<any> {
    return this.http.put<any>(this._baseUrl + 'employees/update', data, httpOptions);
  }
  deleteEmployee(id: any): Observable<any> {
    return this.http.delete<any>(this._baseUrl + `employees/${id}`, httpOptions);
  }

}
