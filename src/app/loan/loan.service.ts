import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from '@/app/core/model/page/pageable';
import { Loan } from './model/loan';
import { HttpClient } from '@angular/common/http';
import environment from '@/enviroment';

interface LoanPage {
    content: Loan[];
    pageable: Pageable;
    totalElements: number;
}

@Injectable({
    providedIn: 'root',
})
export class LoanService {
    constructor(private http: HttpClient) {}

    private readonly baseUrl = `${environment.apiUrl}/loans`;

    getLoans(
        pageable: Pageable,
        title?: string,
        clientId?: number,
        date?: string
    ): Observable<LoanPage> {
        return this.http.post<LoanPage>(
            `${this.baseUrl}/search`,
            { pageable, title, clientId, date }
        );
    }
    
    saveLoan(loan: Loan): Observable<void> {
        const { id } = loan;
        if (!id) {
            return this.http.post<void>(this.baseUrl, loan);
        }
        return this.http.put<void>(`${this.baseUrl}/${id}`, loan);
    }

    deleteLoan(idLoan: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${idLoan}`);
    }
}
