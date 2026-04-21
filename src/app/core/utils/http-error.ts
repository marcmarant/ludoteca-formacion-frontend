import { HttpErrorResponse } from "@angular/common/http";

export const getErrorMessage = (error: HttpErrorResponse): string => {
    const message = error.error;

    if (typeof message === 'string') {
        return message;   
    }
    else if (Array.isArray(message)) {
        if (message.length > 1) {
            return 'Hay campos con errores. Por favor, revise el formulario';
        }
        return message[0];
    }
    else {
        return 'Se ha producido un error inesperado.';
    }
}