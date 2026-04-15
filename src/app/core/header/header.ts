import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '@/app/auth/auth.service';

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
    authService = inject(AuthService);

    onLogout(): void {
        this.authService.logout();
    }
}
