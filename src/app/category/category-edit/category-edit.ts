import { Component, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../category.service';
import { Category } from '../model/category';
import { HttpErrorResponse } from '@angular/common/http';
import { getErrorMessage } from '@/app/core/utils/http-error';

@Component({
    selector: 'app-category-edit',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    templateUrl: './category-edit.html',
    styleUrl: './category-edit.scss'
})
export class CategoryEdit {
    category: Category = {} as Category;
    apiErrorMessage = signal<string>('');

    constructor(
        public dialogRef: MatDialogRef<CategoryEdit>,
        @Inject(MAT_DIALOG_DATA) public data: {category : Category},
        private categoryService: CategoryService
    ) {}

    ngOnInit(): void {
        this.category = this.data.category ? Object.assign({}, this.data.category) : {} as Category;
    }

    onSave(): void {
        this.apiErrorMessage.set('');

        this.categoryService.saveCategory(this.category).subscribe({
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