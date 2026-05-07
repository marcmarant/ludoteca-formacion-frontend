import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmation } from '@/app/core/components/dialog-confirmation';
import { UserService } from '../user.service';
import { User } from '../model/user';
import { Role, getRoleName } from '../model/role';
import { AuthService } from '@/app/auth/auth.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-user-list',
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatSelectModule,
        CommonModule
    ],
    templateUrl: './user-list.html',
    styleUrl: './user-list.scss',
})
export class UserList implements OnInit {
    
    dataSource = new MatTableDataSource<User>();
    displayedColumns: string[] = ['id', 'username', 'role', 'action'];

    roles = Object.values(Role) as Role[];
    getRoleName = getRoleName;

    constructor(
        private userService: UserService,
        public authService: AuthService,
        public dialog: MatDialog,
        public router: Router
    ) {}

    ngOnInit(): void {
        this.userService.getUsers().subscribe((users) => {
            console.log(users);
            this.dataSource.data = users;
        });
    }

    // ESTO AUN NO ESTA IMPLEMENTADO
    isCurrentUser(user: User): boolean {
        return user.username === this.authService.getCurrentUsername();
    }

    createUser() {}
    /*createUser() {
        const dialogRef = this.dialog.open(UserEdit, {
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
        });    
    }*/

    switchUserRole(user: User, role: Role) {
        if (user.role === role || !user.id) return;

        const dialogRef = this.dialog.open(DialogConfirmation, {
            data: {
                title: `Cambiar rol a ${getRoleName(role)}`,
                description: `¿Estas seguro de que quieres cambiar el rol de ${user.username} a ${getRoleName(role)}?`
            }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.userService.updateUserRole(user.id, role).subscribe(() => this.ngOnInit());
            } else {
                this.ngOnInit();
            }
        });
    }

    deleteUser(user: User) {    
        const dialogRef = this.dialog.open(DialogConfirmation, {
            data: { title: "Eliminar usuario", description: "Atención si borra el usuario se perderán sus datos.<br> ¿Desea eliminar el usuario?" }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.userService.deleteUser(user.id).subscribe(
                    () => this.ngOnInit(),
                );
            }
        });
    }

}

