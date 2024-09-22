import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      setHeaders: {
        'X-Api-Key': 'NjkzNTllZDktMzcwMC00YTI0LTg3MGMtNTA0MTlmNTRmNGQ3'
      }
    });
    return next.handle(clonedRequest);
  }
}
