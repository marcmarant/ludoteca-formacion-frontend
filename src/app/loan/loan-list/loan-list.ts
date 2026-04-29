import { Component, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { LoanEdit } from '../loan-edit/loan-edit';
import { LoanService } from '../loan.service';
import { Loan } from '../model/loan';
import { Pageable } from '@/app/core/model/page/pageable';
import { DialogConfirmation } from '@/app/core/components/dialog-confirmation';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthService } from '@/app/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ClientService } from '@/app/client/client.service';
import { Client } from '@/app/client/model/client';

@Component({
    selector: 'app-loan-list',
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
    ],
    templateUrl: './loan-list.html',
    styleUrl: './loan-list.scss',
})
export class LoanList implements OnInit {
    clients: Client[] = [];
    loans = signal<Loan[]>([]);

    pageNumber: number = 0;
    pageSize: number = 5;
    totalElements: number = 0;

    filterTitle = '';
    filterClientId?: number;
    filterDate = '';

    displayedColumns: string[] = ['id', 'title', 'client', 'loanDate', 'returnDate', 'action'];

    constructor(
        private loanService: LoanService,
        private clientService: ClientService,
        public authService: AuthService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.clientService
            .getClients()
            .subscribe((clients) => (this.clients = clients));

        this.loadPage();
    }

    onCleanFilter(): void {
        this.filterTitle = '';
        this.filterClientId = undefined;
        this.filterDate = '';
        this.pageNumber = 0;
        this.loadPage();
    }

    onSearch(): void {
        this.pageNumber = 0;
        this.loadPage();
    }

    loadPage(event?: PageEvent) {
        const pageable: Pageable = {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            sort: [
                {
                    property: 'id',
                    direction: 'ASC',
                },
            ],
        };

        if (event != null) {
            pageable.pageSize = event.pageSize;
            pageable.pageNumber = event.pageIndex;
        }

        this.loanService
            .getLoans(
                pageable,
                this.filterTitle || undefined,
                this.filterClientId,
                this.filterDate || undefined
            )
            .subscribe((data) => {
                this.loans.set(data.content);
                this.pageNumber = data.pageable.pageNumber;
                this.pageSize = data.pageable.pageSize;
                this.totalElements = data.totalElements;
            });
    }

    createLoan() {
        const dialogRef = this.dialog.open(LoanEdit, {
            data: {},
        });

        dialogRef.afterClosed().subscribe(() => this.loadPage());
    }

    editLoan(loan: Loan) {
        const dialogRef = this.dialog.open(LoanEdit, {
            data: { loan: loan },
        });

        dialogRef.afterClosed().subscribe(() => this.loadPage());
    }

    deleteLoan(loan: Loan) {
        const dialogRef = this.dialog.open(DialogConfirmation, {
            data: {
                title: 'Eliminar préstamo',
                description:
                    'Atención si borra el préstamo se perderán sus datos.<br> ¿Desea eliminar el préstamo?',
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.loanService.deleteLoan(loan.id).subscribe(() => this.loadPage());
            }
        });
    }
}
