import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from './model/game';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    constructor(private http: HttpClient) {}

    private baseUrl = 'http://localhost:8080/games';

    getGames(title?: string, categoryId?: number): Observable<Game[]> {
        return this.http.get<Game[]>(this.composeFindUrl(title, categoryId));
    }

    saveGame(game: Game): Observable<void> {
        const { id } = game;
        if (!id) {
            return this.http.post<void>(this.baseUrl, game);
        }
        return this.http.put<void>(`${this.baseUrl}/${id}`, game);
    }

    private composeFindUrl(title?: string, categoryId?: number): string {
        const params = new URLSearchParams();
        if (title) {
          params.set('title', title);
        }  
        if (categoryId) {
            params.set('idCategory', categoryId.toString());
        }
        const queryString = params.toString();
        return queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;
    }

}