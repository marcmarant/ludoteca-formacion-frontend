import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService, AuthRequest } from '../auth';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth-form',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    templateUrl: './auth-form.html',
    styleUrl: './auth-form.scss',
})
export class AuthForm {
    private fb = inject(FormBuilder);
    private router = inject(Router);

    form = this.fb.nonNullable.group({
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(5)]]
    });

    constructor(private authService: AuthService) {}

    onSubmit() {
        if (this.form.invalid) return;
        console.log(this.form.value);
        this.authService.login(this.form.value as AuthRequest).subscribe({
            next: (token) => {
                this.authService.setAuthenticated(token);
                this.router.navigate(['/']);
            },
            error: (err) => alert('Login failed: ' + err.message)
        });
    }
}
