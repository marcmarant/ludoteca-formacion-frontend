import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmation } from '@/app/core/components/dialog-confirmation';
import { UserCreate } from '../user-create';
import { UserService } from '../user.service';
import { User } from '../model/user';
import { Role, getRoleName } from '../model/role';
import { AuthService } from '@/app/auth/auth.service';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

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
    private roleByUserId: Record<number, Role> = {};
    private updatingRoleUserIds = new Set<number>();

    constructor(
        private userService: UserService,
        public authService: AuthService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.userService.getUsers().subscribe((users) => {
            this.dataSource.data = users;
            this.roleByUserId = Object.fromEntries(
                users.map((user) => [user.id, user.role])
            ) as Record<number, Role>;
        });
    }

    displayedRole(user: User): Role {
        return this.roleByUserId[user.id] ?? user.role;
    }

    isRoleUpdating(user: User): boolean {
        return this.updatingRoleUserIds.has(user.id);
    }

    isCurrentUser(user: User): boolean {
        return user.username === this.authService.getCurrentUsername();
    }

    createUser() {
        const dialogRef = this.dialog.open(UserCreate, {
            data: {}
        });

        dialogRef.afterClosed().subscribe(() => this.ngOnInit());
    }

    switchUserRole(user: User, change: MatSelectChange) {
        const role = change.value as Role;
        const previousRole = this.displayedRole(user);

        change.source.value = previousRole;

        if (previousRole === role || !user.id || this.isRoleUpdating(user)) return;

        const dialogRef = this.dialog.open(DialogConfirmation, {
            data: {
                title: `Cambiar rol a ${getRoleName(role)}`,
                description: `¿Estas seguro de que quieres cambiar el rol de ${user.username} a ${getRoleName(role)}?`
            }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                setTimeout(() => {
                    this.updatingRoleUserIds.add(user.id);
                    this.userService.updateUserRole(user.id, role).subscribe({
                        next: () => this.ngOnInit(),
                        error: () => this.updatingRoleUserIds.delete(user.id),
                        complete: () => this.updatingRoleUserIds.delete(user.id),
                    });
                }, 0);
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

