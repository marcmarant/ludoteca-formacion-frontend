import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '@/app/core/model/page/pageable';
import { Author } from './model/author';
import { AuthorPage } from './model/author-page';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class AuthorService {
    constructor(private http: HttpClient) {}

    private baseUrl = 'http://localhost:8080/authors';

    getAllAuthors(): Observable<Author[]> {
        return this.http.get<Author[]>(this.baseUrl);
    }

    getAuthors(pageable: Pageable): Observable<AuthorPage> {
        return this.http.post<AuthorPage>(`${this.baseUrl}/search`, { pageable: pageable });
    }

    saveAuthor(author: Author): Observable<Author> {
        const { id } = author;
        if (!id) {
            return this.http.post<Author>(this.baseUrl, author);
        }
        return this.http.put<Author>(`${this.baseUrl}/${id}`, author);
    }

    deleteAuthor(idAuthor: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${idAuthor}`);
    }
}
