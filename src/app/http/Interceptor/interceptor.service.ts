import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  /**
   * 
   * @param req 
   * @param next 
   * @returns 
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('token',sessionStorage.getItem('token'))
    let req = request.clone({
      setHeaders: {
        // Authorization: `Bearer ${sessionStorage.getItem('token') as any}`
        Authorization: ``
      }
    });
    return next.handle(req).pipe(
      catchError(err => this.handleError(err) as Observable<any>)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log('error',error);
    if (error?.status === 401) {
      // 跳转到登录页面
      
    }
    return throwError(error);
  }


}
