import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const url: string = environment.url || environment.localUrl;

const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http : HttpClient) { }

  getPermission(): Observable<any> {
    return this.http.get<any>(url + `permission/findAll`, {
      responseType: 'json',
    });
  }

  postPermission(res:any): Observable<any>{
    return this.http.post<any>(url + `permission/post`, res, {
      responseType: 'json'
    })
  }

  findPermissionByName(res:any): Observable<any> {
    return this.http.get<any>(url + `permission/findByPermission?permission=${res}`, {
      responseType: 'json',
    });
  }

  deletePermission(req: any): Observable<any> {
    return this.http.post<any>(url + `permission/delete?id=${req}`,  {
      responseType: 'json',
    });
  }

  putPersmission(req: any): Observable<any> {
    return this.http.put<any>(url + `permission/put`, req, {
      responseType: 'json',
    });
  }

  findPermissionByUserId(id: any): Observable<any> {
    return this.http.get<any>(url + `/permission/findByUser?user=${id}`, {
      responseType: 'json',
    });
  }

  findByPermissionId(id: number): Observable<any> {
    return this.http.get<any>(url + `permission/getById?id=${id}`, {
      responseType: 'json',
    });
  }

}
