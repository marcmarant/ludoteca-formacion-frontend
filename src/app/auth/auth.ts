import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface AuthRequest {
    username: string;
    password: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}

    private baseUrl = 'http://localhost:8080/auth';

    private readonly STORAGE_KEY = 'auth_token';

    private _isAuthenticated = signal<boolean>(this.readInitialState());
    isAuthenticated = this._isAuthenticated.asReadonly();

    login(authRequest: AuthRequest): Observable<string> {
        return this.http.post(this.baseUrl, authRequest, { responseType: 'text'});
    }

    setAuthenticated(token: string): void {
        this._isAuthenticated.set(true);
        localStorage.setItem(this.STORAGE_KEY, token);
    }

    logout(): void {
        this._isAuthenticated.set(false);
        localStorage.removeItem(this.STORAGE_KEY);
    }

    private readInitialState(): boolean {
        return!!localStorage.getItem(this.STORAGE_KEY);
    }
}