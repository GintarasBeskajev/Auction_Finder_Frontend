// auth.interceptor.ts

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAccessToken();

    if (token) {
      const authRequest = this.addToken(request, token);

      return next.handle(authRequest).pipe(
        catchError((error) => {
          if (error.status === 401) {
            return this.authService.refreshToken().pipe(
              switchMap((tokens) => {
                this.authService.setTokens(tokens);
                const updatedRequest = this.addToken(request, tokens.access_token);
                return next.handle(updatedRequest);
              }),
              catchError((refreshError) => {
                this.authService.logout();
                this.router.navigate(['/Login']).then(() => {
                  window.location.reload();
                });
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
}
