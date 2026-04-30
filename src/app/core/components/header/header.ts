import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '@/app/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmation } from '@/app/core/components/dialog-confirmation';

@Component({
    selector: 'app-header',
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule, 
        MatToolbarModule,
    ],
    templateUrl: './header.html',
    styleUrl: './header.scss'
})
export class Header {
    constructor(
        public authService: AuthService,
        public dialog: MatDialog,
        public router: Router
    ) {}

    onLogout() {    
        const dialogRef = this.dialog.open(DialogConfirmation, {
            data: { title: "Cerrar Sesión", description: "¿Está seguro de que desea cerrar la sesión?" }
        });
    
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.authService.logout();
                this.router.navigate(['/']);
            }
        });
    }
}
