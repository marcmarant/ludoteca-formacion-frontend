import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from './model/category';

@Injectable({
providedIn: 'root'
})
export class CategoryService { 

    constructor(
        private http: HttpClient
    ) { }

    private baseUrl = 'http://localhost:8080/categories';

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.baseUrl);
    }

    saveCategory(category: Category): Observable<Category> {
        const { id } = category;
        if (!id) {
            return this.http.post<Category>(this.baseUrl, category);
        }
        return this.http.put<Category>(`${this.baseUrl}/${id}`, category);
    }

    deleteCategory(idCategory : number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${idCategory}`);
    }  
}

