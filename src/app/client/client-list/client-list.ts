import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmation } from '@/app/core/components/dialog-confirmation';
import { ClientEdit } from '../client-edit';
import { ClientService } from '../client.service';
import { Client } from '../model/client';
import { AuthService } from '@/app/auth/auth.service';

@Component({
    selector: 'app-client-list',
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        CommonModule
    ],
    templateUrl: './client-list.html',
    styleUrl: './client-list.scss',
})
export class ClientList implements OnInit {

    dataSource = new MatTableDataSource<Client>();
    displayedColumns: string[] = ['id', 'name', 'action'];

    constructor(
        private clientService: ClientService,
        public authService: AuthService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.clientService.getClients().subscribe(
            clients => this.dataSource.data = clients
        )
    }

    createClient() {
        const dialogRef = this.dialog.open(ClientEdit, {
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
        });    
    }

    editClient(client: Client) {
        const dialogRef = this.dialog.open(ClientEdit, {
            data: { client }
        });

        dialogRef.afterClosed().subscribe(() => this.ngOnInit());
    }
    

    deleteClient(client: Client) {    
        const dialogRef = this.dialog.open(DialogConfirmation, {
            data: { title: "Eliminar cliente", description: "Atención si borra el cliente se perderán sus datos.<br> ¿Desea eliminar el cliente?" }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.clientService.deleteClient(client.id).subscribe(() => this.ngOnInit()); 
            }
        });
    }
}
