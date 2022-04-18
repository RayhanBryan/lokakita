import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const url: string = environment.url;
const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getGroup(): Observable<any> {
    return this.http.get<any>(url + `/groups/findAll`, {
      responseType: 'json',
    });
  }

  postGroup(req: any): Observable<any> {
    return this.http.post<any>(url + `/groups/post`, req, {
      responseType: 'json',
    })
  }

  putGroup(req: any): Observable<any> {
    return this.http.put<any>(url + `/groups/put`, req, {
      responseType: 'json',
    })
  }

  deleteGroup(id: number): Observable<any> {
    return this.http.get<any>(url + `/groups/delete?id=${id}`, {
      responseType: 'json',
    });
  }
}
