import { Component, Inject, OnInit, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameService } from '../game.service';
import { Game } from '../model/game';
import { AuthorService } from '@/app/author/author.service';
import { Author } from '@/app/author/model/author';
import { CategoryService } from '@/app/category/category.service';
import { Category } from '@/app/category/model/category';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpErrorResponse } from '@angular/common/http';
import { getErrorMessage } from '@/app/core/utils/http-error';

@Component({
    selector: 'app-game-edit',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule ],
    templateUrl: './game-edit.html',
    styleUrl: './game-edit.scss',
})
export class GameEdit implements OnInit {
    game: Game = {} as Game;
    authors: Author[] = [];
    categories: Category[] = [];
    apiErrorMessage = signal<string>('');

    constructor(
        public dialogRef: MatDialogRef<GameEdit>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private gameService: GameService,
        private categoryService: CategoryService,
        private authorService: AuthorService
    ) {}

    ngOnInit(): void {
        this.game = this.data.game ? Object.assign({}, this.data.game) : {} as Game;

        this.categoryService.getCategories().subscribe((categories) => {
            this.categories = categories;

            if (this.game.category != null) {
                const categoryFilter: Category[] = categories.filter(
                    (category) => category.id == this.data.game.category.id
                );
                if (categoryFilter != null) {
                    this.game.category = categoryFilter[0];
                }
            }
        });

        this.authorService.getAllAuthors().subscribe((authors) => {
            this.authors = authors;

            if (this.game.author != null) {
                const authorFilter: Author[] = authors.filter(
                    (author) => author.id == this.data.game.author.id
                );
                if (authorFilter != null) {
                    this.game.author = authorFilter[0];
                }
            }
        });
    }

    onSave(form: NgForm): void {
        if (form.invalid) return;
        
        this.apiErrorMessage.set('');

        this.gameService.saveGame(this.game).subscribe({
            next: () => {
                this.dialogRef.close();
            },
            error: (error: HttpErrorResponse) => {
                this.apiErrorMessage.set(getErrorMessage(error));
            },
        });
    }

    onClose() {
        this.dialogRef.close();
    }
}
