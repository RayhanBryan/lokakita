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

  /**
   * This function loads all existing records of location from database
   */
  getLocation(): Observable<any> {
    return this.http.get<any>(this.locationUrl+`findAll`,httpOptions);
  }

  /**
   * This function deletes a record from a database
   * @param locationId this is the ID of a location record we want to delete
   */
  deleteLocation(locationId:number){
    return this.http.delete<any>(this.locationUrl+locationId,httpOptions);
  }

  /**
   * This function creates a new record to database using POST request
   * @param res this is the body of the request
   */
  postLocation(res:any):Observable<any>{
    return this.http.post<any>(this.locationUrl+'post',res,httpOptions);
  }

  /**
   * This function updates a record in database
   * @param res this is the body of the request
   */
  putLocation(res:any):Observable<any>{
    return this.http.put<any>(this.locationUrl+'put',res,httpOptions);
  }
  
  /**
   * This function searches a record based based on their street address
   * @param keyword this is a keyword we want to search
   */
  searchLocation(keyword:string):Observable<any>{
    return this.http.get<any>(this.locationUrl+`getByStreetAddress?streetAddress=${keyword}`,httpOptions);
  }

  /**
   * This is a function to get a all column of a record using its ID
   * @param locationId this is a ID of a record we want to get the details of
   */
  getLocationById(locationId:number):Observable<any>{
    return this.http.get<any>(this.locationUrl+`getById?id=${locationId}`,httpOptions);
  }

  /**
   * This function searches a record based based on their city
   * @param keyword this is a keyword we want to search
   */
  searchLocationByCity(keyword:string){
    return this.http.get<any>(this.locationUrl+`getByCity?city=${keyword}`,httpOptions);
  }

  /**
   * This function searches a record based based on their country name
   * @param keyword this is a keyword we want to search
   */
  searchLocationByCountryName(keyword:string){
    return this.http.get<any>(this.locationUrl+`getByCountryName?countryName=${keyword}`,httpOptions);
  }

  /**
   * This function searches a record based based on their state province
   * @param keyword this is a keyword we want to search
   */
  searchLocationByStateProvince(keyword:string){
    return this.http.get<any>(this.locationUrl+`getByStateProvince?stateProvince=${keyword}`,httpOptions);
  }

  /**
   * This is a function to get a all column of a record using its ID
   * @param regionId this is the ID of a record we want to get the details of
   */
  getStateProvince(countryId:string){
    return this.http.get<any>(this.locationUrl+`getStateProvinceByCountryId?countryId=${countryId}`,httpOptions);
  }
}
