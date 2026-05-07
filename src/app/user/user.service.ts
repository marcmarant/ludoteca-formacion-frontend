import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model/user';
import { Role } from './model/role';
import environment from '@/enviroment';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) {}

    private baseUrl = `${environment.apiUrl}/users`;

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.baseUrl);
    }

    saveUser(user: User): Observable<void> {
        const { id } = user;
        if (!id) {
            return this.http.post<void>(this.baseUrl, user);
        }
        return this.http.put<void>(`${this.baseUrl}/${id}`, user);
    }

    updateUserRole(idUser: number, role: Role): Observable<void> {
        return this.http.patch<void>(`${this.baseUrl}/${idUser}?role=${role}`, {});
    }

    deleteUser(idUser: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${idUser}`);
    }  
}
