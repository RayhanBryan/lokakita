import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const url: string = environment.url || environment.localUrl;
const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class HakAksesService {
  constructor(private http: HttpClient) {}

  getAccess(): Observable<any> {
    return this.http.get<any>(url + `access/findAll`, {
      responseType: 'json',
    });
  }

  getAccessById(id: number): Observable<any> {
    return this.http.get<any>(url + `access/findByUser?user=${id}`, {
      responseType: 'json',
    });
  }

  postAccess(req: any): Observable<any> {
    return this.http.post<any>(url + `access/post`, req, {
      responseType: 'json',
    });
  }

  putAccess(req: any): Observable<any> {
    return this.http.put<any>(url + `access/put`, req, {
      responseType: 'json',
    });
  }

  putUserxGroupId(id:any, group:any): Observable<any>{
    return this.http.put<any>(
      url + `access/changeIsActiveByUserIdAndGroupId?userId=${id}&groupId=${group}`,
      {
        responseType: 'json',
      }
    );
  }

  getAccsesByUserIdxGroupId(id: any, group: any): Observable<any> {
    return this.http.get<any>(
      url + `access/findByUserIdAndGroupId?userId=${id}&groupId=${group}`,
      {
        responseType: 'json',
      }
    );
  }

  getByGroupName(keyword:any): Observable<any> {
    return this.http.get<any>(
      url + `access/groups/getByGroupName?groupName=${keyword}`,
      {
        responseType: 'json',
      }
    );
  }

  deleteAccess(id: number): Observable<any> {
    return this.http.get<any>(url + `access/delete?id=${id}`, {
      responseType: 'json',
    });
  }

  putAccessIsActive(id: any, group: any, isActive: any): Observable<any> {
    return this.http.put<any>(
      url +
        `access/put/putByUserIdAndGroupId?userId=${id}&groupId=${group}&isActive=${isActive}`,
      {
        responseType: 'json',
      }
    );
  }
}
