import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private _url: string = 'http://localhost:9090/customer/findAll';
  private _baseUrl: string = environment.url || environment.localUrl;

  constructor(private http: HttpClient) {}

  getCustomer(): Observable<any> {
    return this.http
      .get<any>(this._baseUrl + 'customer/findAll', httpOptions)
      .pipe(map((data: any) => data.data || data));
  }

  getAllCategories(all: string): Observable<any> {
    return this.http
      .get<any>(this._baseUrl + `customer/findByAllCategories?all=${all}`, {
        responseType: 'json',
      })
      .pipe(map((data: any) => data.data || data));
  }

  getCustomerName(name: string): Observable<any> {
    return this.http
      .get<any>(
        this._baseUrl + `customer/findByCustomerName?customerName=${name}`,
        { responseType: 'json' }
      )
      .pipe(map((data: any) => data.data || data));
  }

  getCustomerEmail(email: string): Observable<any> {
    return this.http
      .get<any>(this._baseUrl + `customer/findByCustomerEmail?email=${email}`, {
        responseType: 'json',
      })
      .pipe(map((data: any) => data.data || data));
  }

  getCustomerById(id: number): Observable<any> {
    return this.http.get<any>(
      this._baseUrl + `customer/GetById?id=${id}`,
      httpOptions
    );
  }

  postCustomer(req: any): Observable<any> {
    return this.http.post<any>(
      this._baseUrl + 'customer/posts',
      req,
      httpOptions
    );
  }

  putCustomer(data: any): Observable<any> {
    return this.http.put<any>(
      this._baseUrl + 'customer/update',
      data,
      httpOptions
    );
  }

  deleteCustomer(id: any): Observable<any> {
    return this.http.delete<any>(this._baseUrl + `customer/${id}`, httpOptions);
  }
}
