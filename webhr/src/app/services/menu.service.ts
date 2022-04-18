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

export class MenuService {

  constructor(private http: HttpClient) { }

  getMenu(): Observable<any> {
    return this.http.get<any>(url + `/menu/findAll`, {
      responseType: 'json',
    });
  }

  postMenu(req: any): Observable<any> {
    return this.http.post<any>(url + `/menu/post`, req, {
      responseType: 'json',
    })
  }

  putMenu(req: any): Observable<any> {
    return this.http.put<any>(url + `/menu/put`, req, {
      responseType: 'json',
    })
  }

  deleteMenu(id: number): Observable<any> {
    return this.http.get<any>(url + `/menu/delete?id=${id}`, {
      responseType: 'json',
    });
  }
}
