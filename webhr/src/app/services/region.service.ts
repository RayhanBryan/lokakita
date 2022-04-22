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

  /**
   * This function loads all existing records of region from database
   */
  getRegion(): Observable<any> {
    return this.http.get<any>(this.regionUrl+`findAll`,httpOptions);
  }

  /**
   * This function deletes a record from a database
   * @param regionId this is the ID of a region record we want to delete
   */
  deleteRegion(regionId:number){
    return this.http.delete<any>(this.regionUrl+regionId,httpOptions);
  }

  /**
   * This function creates a new record to database using POST request
   * @param res this is the body of the request
   */
  postRegion(res:any):Observable<any>{
    return this.http.post<any>(this.regionUrl+'post',res,httpOptions);
  }

  /**
   * This function updates a record in database
   * @param res this is the body of the request
   */
  putRegion(res:any):Observable<any>{
    return this.http.put<any>(this.regionUrl+'put',res,httpOptions);
  }
  
  /**
   * This function searches a record based on their region name
   * @param keyword this is a keyword we want to search
   */
  searchRegion(keyword:string):Observable<any>{
    return this.http.get<any>(this.regionUrl+`getByRegionName?regionName=${keyword}`,httpOptions);
  }

  /**
   * This is a function to get a all column of a record using its ID
   * @param regionId this is a ID of a record we want to get the details of
   */
  getRegionById(regionId:number):Observable<any>{
    return this.http.get<any>(this.regionUrl+`getById?id=${regionId}`,httpOptions);
  }
}
