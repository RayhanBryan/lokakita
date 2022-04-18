import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const URL: string = environment.url;
const httpOptions = {
  headers: new HttpHeaders({
    'Accept' : 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private LocationUrl=URL+'locations/';
  constructor(private http: HttpClient) { }
  getLocation(): Observable<any> {
    return this.http.get<any>(this.LocationUrl+`findAll`,httpOptions);
  }
}
