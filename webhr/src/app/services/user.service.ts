import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const url: string = environment.url;
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    return this.http.get<any>(url + `users/findAll`, {
      responseType: 'json',
    });
  }

  postUser(req: any): Observable<any> {
    return this.http.post<any>(url + `users/post`, req, {
      responseType: 'json',
    });
  }

  putUser(res: any): Observable<any> {
    return this.http.put<any>(url + `users/put`, res, httpOptions);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(url + `users/delete?id=${id}`, {
      responseType: 'json',
    });
  }

  getUsername(namereq: any): Observable<any> {
    return this.http.get<any>(
      url + `users/findByUsername?username=${namereq}`,
      { responseType: 'json', }
    );
  }

  getByUsername(username: string): Observable<any> {
    return this.http.get<any>(url + `users/getByUsername?username=${username}`, httpOptions)
  }
}
