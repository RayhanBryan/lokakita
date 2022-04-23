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
export class GroupMenuService {
  constructor(private http: HttpClient) {}

  getGroupMenu(): Observable<any> {
    return this.http.get<any>(url + `groupmenu/findAll`, {
      responseType: 'json',
    });
  }

  getByGroupId(id: number): Observable<any> {
    return this.http.get<any>(url + `groupmenu/findByGroup?group=${id}`, {
      responseType: 'json',
    });
  }

  postGroupMenu(req: any): Observable<any> {
    return this.http.post<any>(url + `groupmenu/post`, req, {
      responseType: 'json',
    });
  }

  putGroupMenu(req: any): Observable<any> {
    return this.http.put<any>(url + `groupmenu/put`, req, {
      responseType: 'json',
    });
  }

  deleteGroupMenu(id: number): Observable<any> {
    return this.http.get<any>(url + `groupmenu/delete?id=${id}`, {
      responseType: 'json',
    });
  }
}
