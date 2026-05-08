import { Component, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../user.service';
import { User } from '../model/user';
import { Role, getRoleName } from '../model/role';
import { getErrorMessage } from '@/app/core/utils/http-error';

@Component({
    selector: 'app-user-create',
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule
    ],
    templateUrl: './user-create.html',
    styleUrl: './user-create.scss',
})
export class UserCreate {
    user: User = {} as User;
    roles = Object.values(Role) as Role[];
    getRoleName = getRoleName;
    apiErrorMessage = signal<string>('');

    constructor(
        public dialogRef: MatDialogRef<UserCreate>,
        @Inject(MAT_DIALOG_DATA) public data: { user?: User },
        private userService: UserService
    ) {}

    ngOnInit(): void {
        if (!this.user.role) {
            this.user.role = Role.ROLE_EMPLOYEE;
        }
    }

    createUser(form: NgForm): void {
        if (form.invalid) return;

        this.apiErrorMessage.set('');

        this.userService.saveUser(this.user).subscribe({
            next: () => this.dialogRef.close(),
            error: (error: HttpErrorResponse) => {
                this.apiErrorMessage.set(getErrorMessage(error));
            }
        });
    }

    onClose(): void {
        this.dialogRef.close();
    }
}
