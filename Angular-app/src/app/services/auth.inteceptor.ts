import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth-service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler){
     const token = localStorage.getItem('token');
     const updatedrequest = req.clone({
      headers: req.headers.set('Authorization', token)
    });
    return next.handle(updatedrequest);
  }
}
