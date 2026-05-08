import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import environment from '@/enviroment';
import { Role } from '@/app/user/model/role';

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

    getCurrentRole(): Role | null {
        const payload = this.getTokenPayload();
        return (payload?.role ?? payload?.roles?.[0] ?? null) as Role | null;
    }

    isAdmin(): boolean {
        return this.getCurrentRole() === Role.ROLE_ADMIN;
    }

    getCurrentUsername(): string | null {
        const payload = this.getTokenPayload();
        return payload?.username ?? payload?.sub ?? null;
    }

    private getTokenPayload(): any | null {
        const token = localStorage.getItem(environment.tokenStorageKey);
        if (!token) return null;

        try {
            const raw = token.split('.')[1];
            if (!raw) return null;
            const normalized = raw.replace(/-/g, '+').replace(/_/g, '/');
            return JSON.parse(atob(normalized));
        } catch {
            return null;
        }
    }

    private readInitialState(): boolean {
        return!!localStorage.getItem(environment.tokenStorageKey);
    }
}