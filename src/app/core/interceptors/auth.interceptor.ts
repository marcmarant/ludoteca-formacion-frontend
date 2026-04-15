import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import environment from '@/enviroment';
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Incluimos el token de autenticacion en la cabecera
        const token = localStorage.getItem(environment.tokenStorageKey);
        const authReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)});
    
        return next.handle(authReq);
    }
}