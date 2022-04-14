import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const url: string = environment.url;
const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private http: HttpClient) {}
  getDepartment(): Observable<any> {
    return this.http.get<any>(url + `departments/findAll`, {
      responseType: 'json',
    });
  }

  getDepartmentByName(nama: string): Observable<any> {
    return this.http.get<any>(
      url +
        `departments/findByDepartmentName?departmentName=${nama}&page=0&size=10000`,
      {
        responseType: 'json',
      }
    );
  }

  postDepartment(req: any): Observable<any> {
    return this.http.post<any>(url + `departments/`, req, {
      responseType: 'json',
    });
  }

  putDepartment(req: any): Observable<any> {
    return this.http.put<any>(url + `departments/`, req, {
      responseType: 'json',
    });
  }

  deleteDepartment(id: number): Observable<any> {
    return this.http.delete<any>(url + `departments/delete?id=${id}`, {
      responseType: 'json',
    });
  }
}
