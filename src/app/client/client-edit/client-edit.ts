import { Component, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ClientService } from '../client.service';
import { Client } from '../model/client';
import { HttpErrorResponse } from '@angular/common/http';
import { getErrorMessage } from '@/app/core/utils/http-error';

@Component({
    selector: 'app-client-edit',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    templateUrl: './client-edit.html',
    styleUrl: './client-edit.scss',
})
export class ClientEdit {
    client: Client = {} as Client;
    apiErrorMessage = signal<string>('');

    constructor(
        public dialogRef: MatDialogRef<ClientEdit>,
        @Inject(MAT_DIALOG_DATA) public data: {client : Client},
        private clientService: ClientService
    ) {}

    ngOnInit(): void {
        this.client = this.data.client ? Object.assign({}, this.data.client) : {} as Client;
    }

    onSave(form: NgForm): void {
        if (form.invalid) return;

        this.apiErrorMessage.set('');

        this.clientService.saveClient(this.client).subscribe({
            next: () => {
                this.dialogRef.close();
            },
            error: (error: HttpErrorResponse) => {
                this.apiErrorMessage.set(getErrorMessage(error));
            }
        });
    }

    onClose() {
        this.dialogRef.close();
    }
}
