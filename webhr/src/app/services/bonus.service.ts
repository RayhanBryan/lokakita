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
export class BonusService {
  private _url: string =  "http://localhost:9090/bonus/findAll"
  private _baseUrl: string = environment.url;

  constructor(private http: HttpClient) { }
  getBonus(): Observable<any> {
    return this.http.get<any>(url + 'bonus/findAll', {responseType: 'json',});
  }

  getEmployeeName(name: string): Observable<any> {
    return this.http.get<any>(this._baseUrl+`/bonus/findByFirstName?firstName=${name}&page=0&size=20`, { responseType: 'json' }).pipe(map((data: any) => (data.data || data)));
  }

  getBonusById(id: number): Observable<any> {
    return this.http.get<any>(this._baseUrl + `bonus/GetById?id=${id}`, httpOptions);
  }

  postBonus(req:any): Observable<any> {
    return this.http.post<any>(this._baseUrl+ 'bonus/post', req, httpOptions);
  }
  
  putBonus(data: any): Observable<any> {
    return this.http.put<any>(this._baseUrl + 'bonus/update', data, httpOptions);
  }
  deleteBonus(id: any): Observable<any> {
    return this.http.delete<any>(this._baseUrl + `bonus/${id}`, httpOptions);
  }

}
