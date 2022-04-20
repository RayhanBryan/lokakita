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
  private locationUrl=URL+'locations/';
  constructor(private http: HttpClient) { }
  getLocation(): Observable<any> {
    return this.http.get<any>(this.locationUrl+`findAll`,httpOptions);
  }

  deleteLocation(locationId:number){
    return this.http.delete<any>(this.locationUrl+locationId,httpOptions);
  }

  postLocation(res:any):Observable<any>{
    return this.http.post<any>(this.locationUrl+'post',res,httpOptions);
  }

  putLocation(res:any):Observable<any>{
    return this.http.put<any>(this.locationUrl+'put',res,httpOptions);
  }
  
  searchLocation(keyword:string):Observable<any>{
    return this.http.get<any>(this.locationUrl+`getByStreetAddress?streetAddress=${keyword}`,httpOptions);
  }

  getLocationById(locationId:number):Observable<any>{
    return this.http.get<any>(this.locationUrl+`getById?id=${locationId}`,httpOptions);
  }

  searchLocationByCity(keyword:string){
    return this.http.get<any>(this.locationUrl+`getByCity?city=${keyword}`,httpOptions);
  }
}
