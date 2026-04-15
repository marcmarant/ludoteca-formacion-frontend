import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Client } from './model/client';
import environment from '@/enviroment';

@Injectable({
    providedIn: 'root',
})
export class ClientService {
    constructor(private http: HttpClient) {}

    private baseUrl = `${environment.apiUrl}/clients`;

    getClients(): Observable<Client[]> {
        return this.http.get<Client[]>(this.baseUrl);
    }

    saveClient(client: Client): Observable<Client> {
        const { id } = client;
        if (!id) {
            return this.http.post<Client>(this.baseUrl, client);
        }
        return this.http.put<Client>(`${this.baseUrl}/${id}`, client);
    }

    deleteClient(idClient: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${idClient}`);
    }  
}
