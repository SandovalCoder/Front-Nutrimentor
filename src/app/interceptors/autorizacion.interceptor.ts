import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class AutorizacionInterceptor implements HttpInterceptor {

  constructor (private userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    let token = this.userService.getTokenActual();
    if (token) {
      let clonRequest = req.clone({
        headers: req.headers.set("Authorization","Bearer "+token)
      })
      return next.handle(clonRequest);
    } else {
      return next.handle(req);
    }  
  }  

}
