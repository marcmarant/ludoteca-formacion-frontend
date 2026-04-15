import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import environment from '@/enviroment';

export interface AuthRequest {
    username: string;
    password: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}

    private _isAuthenticated = signal<boolean>(this.readInitialState());
    isAuthenticated = this._isAuthenticated.asReadonly();

    login(authRequest: AuthRequest): Observable<string> {
        return this.http.post(
            `${environment.apiUrl}/auth`,
            authRequest,
            { responseType: 'text'}
        );
    }

    setAuthenticated(token: string): void {
        this._isAuthenticated.set(true);
        localStorage.setItem(environment.tokenStorageKey, token);
    }

    logout(): void {
        this._isAuthenticated.set(false);
        localStorage.removeItem(environment.tokenStorageKey);
    }

    private readInitialState(): boolean {
        return!!localStorage.getItem(environment.tokenStorageKey);
    }
}