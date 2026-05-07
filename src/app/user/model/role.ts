export enum Role {
    ROLE_ADMIN = 'ROLE_ADMIN',
    ROLE_EMPLOYEE = 'ROLE_EMPLOYEE'
}

export const getRoleName = (role: Role): string => {
    if (role === Role.ROLE_ADMIN) {
        return 'Administrador';
    } else if (role === Role.ROLE_EMPLOYEE) {
        return 'Empleado';
    } else {
        return 'Desconocido';
    }
}