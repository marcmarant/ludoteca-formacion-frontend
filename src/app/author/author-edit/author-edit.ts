import { Component, Inject, OnInit, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorService } from '../author.service';
import { Author } from '../model/author';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpErrorResponse } from '@angular/common/http';
import { getErrorMessage } from '@/app/core/utils/http-error';


@Component({
    selector: 'app-author-edit',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule ],
    templateUrl: './author-edit.html',
    styleUrl: './author-edit.scss',
})
export class AuthorEdit implements OnInit {
    author: Author = {} as Author;
    apiErrorMessage = signal<string>('');

    constructor(
        public dialogRef: MatDialogRef<AuthorEdit>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private authorService: AuthorService
    ) {}

    ngOnInit(): void {
        this.author = this.data.author ? Object.assign({}, this.data.author) : {} as Author;
    }

    onSave(form: NgForm): void {
        if (form.invalid) return;
        
        this.apiErrorMessage.set('');

        this.authorService.saveAuthor(this.author).subscribe({
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
