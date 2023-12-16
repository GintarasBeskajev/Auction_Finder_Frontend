import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://clownfish-app-9ilam.ondigitalocean.app/api';
  //http://localhost:5106/api
  //https://clownfish-app-9ilam.ondigitalocean.app/api

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  getCategory(id:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories/${id}`);
  }

  createCategory(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/categories`, data);
  }

  editCategory(data: any, id:number): Observable<any> {
    return this.http.put(`${this.apiUrl}/categories/${id}`, data);
  }

  deleteCategory(id:number){
    return this.http.delete(`${this.apiUrl}/categories/${id}`);
  }

  getBids(id:number, auctionId:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories/${id}/auctions/${auctionId}/bids`);
  }

  getBid(id:number, auctionId:number, bidId:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories/${id}/auctions/${auctionId}/bids/${bidId}`);
  }

  createBid(data: any, id:number, auctionId:number): Observable<any> {
    return this.http.post(`${this.apiUrl}/categories/${id}/auctions/${auctionId}/bids`, data);
  }

  editBid(data: any, id:number, auctionId:number, bidId:number): Observable<any> {
    return this.http.put(`${this.apiUrl}/categories/${id}/auctions/${auctionId}/bids/${bidId}`, data);
  }

  deleteBid(id:number, auctionId:number, bidId:number){
    return this.http.delete(`${this.apiUrl}/categories/${id}/auctions/${auctionId}/bids/${bidId}`);
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

  editAuction(data: any, id:number, auctionId:number): Observable<any> {
    return this.http.put(`${this.apiUrl}/categories/${id}/auctions/${auctionId}`, data);
  }

  deleteAuction(id:number, auctionId:number){
    return this.http.delete(`${this.apiUrl}/categories/${id}/auctions/${auctionId}`);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  getUserAuctions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/auctions`);
  }

  getUserBids(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/bids`);
  }
}
