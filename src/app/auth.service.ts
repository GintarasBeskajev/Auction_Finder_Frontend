import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5106/api';
  private tokenKey = 'auth_token';
  private refreshTokenKey = 'refresh_token';

  constructor(private http: HttpClient) {}

  register(userName: string, email: string, password: string): Observable<any> {
    const body = { userName, email, password };
    console.log(body);
    return this.http.post(`${this.apiUrl}/register`, body);
  }

  // register(data: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/register`, data);
  // }

  login(userName: string, password: string): Observable<any> {
    const body = { userName, password };
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    const body = { refreshToken };
    return this.http.post(`${this.apiUrl}/accessToken`, body);
  }

  logout(): void {
    if (this.isLocalStorageSupported()) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.refreshTokenKey);
    }
  }

  setTokens(tokens: any): void {
    if (this.isLocalStorageSupported()) {
      localStorage.setItem(this.tokenKey, tokens.accessToken);
      localStorage.setItem(this.refreshTokenKey, tokens.refreshToken);
    }
  }

  getAccessToken(): string | null {
    return this.isLocalStorageSupported() ? localStorage.getItem(this.tokenKey) : null;
  }

  getRefreshToken(): string | null {
    return this.isLocalStorageSupported() ? localStorage.getItem(this.refreshTokenKey) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  getRoles(): any {
    const currentAccessToken = this.getAccessToken();

    if(currentAccessToken !== null){
      const decodedToken = jwt_decode.jwtDecode(currentAccessToken);
      const userRoles: string[] = (decodedToken as any)['https://clownfish-app-9ilam.ondigitalocean.app/api'];

      return userRoles;
    } else {
      return null;
    }
  }

  getUserId(): any {
    const currentAccessToken = this.getAccessToken();

    if(currentAccessToken !== null){
      const decodedToken = jwt_decode.jwtDecode(currentAccessToken);
      const userId = decodedToken.sub;

      return userId;
    } else {
      return null;
    }
  }

  isAdmin(): boolean {
    const currentAccessToken = this.getAccessToken();

    if(currentAccessToken !== null){
      const decodedToken = jwt_decode.jwtDecode(currentAccessToken);
      const userRoles: string[] = (decodedToken as any)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

      if(userRoles.includes("Admin")){
        return true;
      }
      return false;
    } else {
      return false;
    }
  }

  private isLocalStorageSupported(): boolean {
    return typeof localStorage !== 'undefined';
  }
}
