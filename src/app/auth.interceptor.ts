// auth.interceptor.ts

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private tokenKey = 'auth_token';
  private refreshTokenKey = 'refresh_token';

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAccessToken();

    if (token) {
      const authRequest = this.addToken(request, token);

      return next.handle(authRequest).pipe(
        catchError((error) => {
          if (error.status === 401 ) {
            return this.authService.refreshToken().pipe(
              switchMap((tokens) => {
                this.authService.setTokens(tokens);
                const updatedRequest = this.addToken(request, tokens.accessToken);
                return next.handle(updatedRequest);
              }),
              catchError((refreshError) => {
                this.authService.logout().subscribe((response) => {
                  if (this.isLocalStorageSupported()) {
                    localStorage.removeItem(this.tokenKey);
                    localStorage.removeItem(this.refreshTokenKey);
                  }
                });
                this.router.navigate(['/Login']);
                return throwError(() => new Error('refreshError'));
              })
            );
          } else {
            return throwError(() => new Error('error'));
          }
        })
      );
    }

    return next.handle(request);
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private isLocalStorageSupported(): boolean {
    return typeof localStorage !== 'undefined';
  }
}
