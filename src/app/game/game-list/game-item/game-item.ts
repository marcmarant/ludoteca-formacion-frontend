import { Component, Input, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '@/app/auth/auth.service';
import { Game } from '../../model/game';

@Component({
    selector: 'app-game-item',
    standalone: true,
    imports: [MatCardModule],
    templateUrl: './game-item.html',
    styleUrl: './game-item.scss'
})
export class GameItem {
    @Input() game: Game = {} as Game;
    
    authService = inject(AuthService);
}
