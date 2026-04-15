import { Component, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GameEdit } from '../game-edit';
import { GameService } from '../game.service';
import { Game } from '../model/game';
import { CategoryService } from '@/app/category/category.service';
import { Category } from '@/app/category/model/category';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GameItem } from './game-item/game-item';
import { AuthService } from '@/app/auth/auth.service';

@Component({
    selector: 'app-game-list',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        GameItem
    ],
    templateUrl: './game-list.html',
    styleUrl: './game-list.scss',
})
export class GameList implements OnInit {
    categories: Category[] = [];
    games = signal<Game[]>([]);
    filterCategory: Category = {} as Category;
    filterTitle = '';

    constructor(
        private gameService: GameService,
        private categoryService: CategoryService,
        public authService: AuthService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.gameService.getGames().subscribe((games) => this.games.set(games));

        this.categoryService
            .getCategories()
            .subscribe((categories) => (this.categories = categories));
    }

    onCleanFilter(): void {
        this.filterTitle = '';
        this.filterCategory = {} as Category;
        this.onSearch();
    }

    onSearch(): void {
        const title = this.filterTitle;
        const categoryId =
            this.filterCategory != null ? this.filterCategory.id : undefined;

        this.gameService
            .getGames(title, categoryId)
            .subscribe((games) => this.games.set(games));
    }

    createGame() {
        const dialogRef = this.dialog.open(GameEdit, {
            data: {},
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.ngOnInit();
        });
    }

    editGame(game: Game) {
        if (!this.authService.isAuthenticated()) return;

        const dialogRef = this.dialog.open(GameEdit, {
            data: { game: game },
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.onSearch();
        });
    }
}
