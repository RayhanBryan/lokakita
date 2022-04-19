import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private _url: string =  "http://localhost:9090/departments/findAll"
  private _urlPosts: string = "https://jsonplaceholder.typicode.com/posts"
  private _baseUrl: string = environment.url;


  constructor(private http:HttpClient) { }

  getDepartment(): Observable<any> {
    return this.http.get<any>(this._url, httpOptions).pipe(map((data: any) => (data.data || data)));
  }

  getDepartmentName(name: string): Observable<any> {
    return this.http.get<any>(this._baseUrl+`/departments/findByDepartmentName?departmentName=${name}&page=0&size=20`, { responseType: 'json' }).pipe(map((data: any) => (data.data || data)));
  }

  getDepartmentById(id: number): Observable<any> {
    return this.http.get<any>(this._baseUrl + `departments/GetById?id=${id}`, httpOptions);
  }

    postDepartment(req:any): Observable<any> {
    return this.http.post<any>(this._baseUrl+ 'departments/posts', req, httpOptions);
    }
  
  putDepartment(data: any): Observable<any> {
    return this.http.put<any>(this._baseUrl + 'departments/update', data, httpOptions);
  }
  deleteDepartment(id: any): Observable<any> {
    return this.http.delete<any>(this._baseUrl + `departments/${id}`, httpOptions);
    
  }
}
