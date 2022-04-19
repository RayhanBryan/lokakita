import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
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
export class RegionService {
  private regionUrl=URL+'regions/';
  constructor(private http: HttpClient) { }

  getRegion(): Observable<any> {
    return this.http.get<any>(this.regionUrl+`findAll`,httpOptions);
  }

  deleteRegion(regionId:number){
    return this.http.delete<any>(this.regionUrl+regionId,httpOptions);
  }

  postRegion(res:any):Observable<any>{
    return this.http.post<any>(this.regionUrl+'post',res,httpOptions);
  }

  putRegion(res:any):Observable<any>{
    return this.http.put<any>(this.regionUrl+'put',res,httpOptions);
  }
  
  searchRegion(keyword:string):Observable<any>{
    return this.http.get<any>(this.regionUrl+`getByRegionName?regionName=${keyword}`,httpOptions);
  }

  getRegionById(regionId:number):Observable<any>{
    return this.http.get<any>(this.regionUrl+`getById?id=${regionId}`,httpOptions);
  }
}
