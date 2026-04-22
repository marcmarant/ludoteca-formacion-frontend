import { Injectable, inject } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '@/app/auth/auth.service';
import { DialogError } from '@/app/core/dialog-error';
import { getErrorMessage } from '@/app/core/utils/http-error';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private readonly dialog = inject(MatDialog);
    private readonly router = inject(Router);
    private readonly authService = inject(AuthService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                this.handleHttpError(error, req.url);
                return throwError(() => error);
            })
        );
    }

    private handleHttpError(error: HttpErrorResponse, requestUrl: string): void {

        // Los errores 400 se manejan desde los formularios
        if (error.status === 400) {
            return;
        }

        // Si el error es 401, redirigimos al login y mostramos un mensaje de sesión expirada
        // Si la petición es de autenticación no hacemos nada, ya que ya estamos en el login
        if (error.status === 401) {
            if (/\/auth(?:$|\?|\/)/.test(requestUrl)) return;
            this.authService.logout();
            this.router.navigate(['/auth']);
            this.openErrorDialog('Sesión expirada', 'Tu sesión ha caducado. Vuelve a iniciar sesión.');
            return;
        }

        // Si el error es 403 mostramos un mensaje informativo
        if (error.status === 403) {
            this.openErrorDialog('Operación no permitida', 'No tienes permisos para realizar esta operación.');
            return;
        }

        // Si el error es de tipo 500 mostramos un mensaje informativo
        if (error.status >= 500) {
            this.openErrorDialog('Error interno', 'Ups, parece que hemos cometido un error.');
            return;
        }

        // Con cualquier otro error mostramos el mensaje de error correspondiente
        this.openErrorDialog('Error', getErrorMessage(error));
    }

    private openErrorDialog(title: string, description: string): void {
        if (this.dialog.openDialogs.length > 0) return;

        this.dialog.open(DialogError, {
            data: {
                title,
                description,
            },
        });
    }
}