import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://clownfish-app-9ilam.ondigitalocean.app/api';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  getCategory(id:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories/${id}`);
  }

  getAuctions(id:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories/${id}/auctions`);
  }

  getAuction(id:number, auctionId:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories/${id}/auctions/${auctionId}`);
  }

  createAuction(data: any, id:number): Observable<any> {
    return this.http.post(`${this.apiUrl}/categories/${id}/auctions`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }
}
