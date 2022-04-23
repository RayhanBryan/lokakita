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
export class PermissionGroupService {

  constructor(private http : HttpClient) { }

  getPermissionGroup(): Observable<any> {
    return this.http.get<any>(url + `permissionGroup/findAll`, {
      responseType: 'json',
    });
  }

  postPermissionGroup(res:any): Observable<any>{
    return this.http.post<any>(url + `permissionGroup/post`, res, {
      responseType: 'json'
    })
  }

  findPermissionByName(res:any): Observable<any> {
    return this.http.get<any>(url + `permission/findByPermission?permission=${res}`, {
      responseType: 'json',
    });
  }

  deletePermissionGroup(req: any): Observable<any> {
    return this.http.post<any>(url + `permissionGroup/delete?id=${req}`,  {
      responseType: 'json',
    });
  }

  putPersmission(req: any): Observable<any> {
    return this.http.put<any>(url + `permission/put`, req, {
      responseType: 'json',
    });
  }

  findPermissionGroupByUserId(id: any): Observable<any> {
    return this.http.get<any>(url + `/permissionGroup/findByUser?user=${id}`, {
      responseType: 'json',
    });
  }

  findByPermissionGroupId(id: number): Observable<any> {
    return this.http.get<any>(url + `permissionGroup/getById?id=${id}`, {
      responseType: 'json',
    });
  }

  putPermissionGroupByUserIdAndGroupId(id:any, group:any, isActive:any){
    return this.http.get<any>(url + `permissionGroup/putByUserIdAndGroupId?permissionId=${id}&groupId=${group}&isActive=${isActive}`, {
      responseType: 'json',
    });
  }
  
}
