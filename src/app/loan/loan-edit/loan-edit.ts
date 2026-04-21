import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { LoanService } from '../loan.service';
import { Loan } from '../model/loan';
import { GameService } from '@/app/game/game.service';
import { Game } from '@/app/game/model/game';
import { ClientService } from '@/app/client/client.service';
import { Client } from '@/app/client/model/client';

@Component({
    selector: 'app-loan-edit',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
    ],
    templateUrl: './loan-edit.html',
    styleUrl: './loan-edit.scss',
})
export class LoanEdit implements OnInit {
    loan: Loan = {} as Loan;
    games: Game[] = [];
    clients: Client[] = [];

    constructor(
        public dialogRef: MatDialogRef<LoanEdit>,
        @Inject(MAT_DIALOG_DATA) public data: { loan?: Loan },
        private loanService: LoanService,
        private gameService: GameService,
        private clientService: ClientService
    ) {}

    ngOnInit(): void {
        this.loan = this.data.loan ? Object.assign({}, this.data.loan) : ({} as Loan);

        this.gameService.getGames().subscribe((games) => {
            this.games = games;

            if (this.loan.game != null) {
                const selectedGame = games.find(
                    (game) => game.id === this.loan.game.id
                );
                if (selectedGame != null) {
                    this.loan.game = selectedGame;
                }
            }
        });

        this.clientService.getClients().subscribe((clients) => {
            this.clients = clients;

            if (this.loan.client != null) {
                const selectedClient = clients.find(
                    (client) => client.id === this.loan.client.id
                );
                if (selectedClient != null) {
                    this.loan.client = selectedClient;
                }
            }
        });
    }

    onSave(): void {
        this.loanService.saveLoan(this.loan).subscribe(() => {
            this.dialogRef.close();
        });
    }

    onClose(): void {
        this.dialogRef.close();
    }
}
