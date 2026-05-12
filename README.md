# Ludoteca Frontend

Frontend en Angular para la app de gestión de una ludoteca. Esta es la rama principal que incluye lo pedido en el tutorial más algunas funcionalidades extra, si bien había algunas funcionalidades que entraban en conflicto con lo pedido en el tutorial, por lo que he decidido añadirlas solo en la rama [extra-features](https://github.com/marcmarant/ludoteca-formacion-frontend/tree/extra-features).

## Funcionalidades añadidas

### Autenticación y control de acceso

- Inicio de sesión para usuarios.
- Cierre de sesión con confirmación.
- Roles para los usaurios (teniendo el rol empleado y administrador).
- Persistencia de sesión mediante token guardado en `localStorage`.
- Protección de operaciones de edición para usuarios no autenticados.

### Interceptores HTTP

- Interceptor de autenticación que añade el token en cada petición.
- Interceptor de errores con mensajes específicos para:
	- `401`: sesión expirada
	- `403`: operación no permitida
	- `500`: error interno
- Gestión centralizada de errores para evitar duplicar lógica en formularios y servicios.

### Gestión de usuarios

- Nuevoa página destinada a la gestión de usuarios
- Creación de nuevos perfiles de usuarios
- Solo esta disponible para usuarios con rol administrador

## Tecnologías

- Angular 21
- TypeScript
- Angular Material
- RxJS

## Estructura general

- `src/app/auth`: autenticación y sesión
- `src/app/core`: guards, interceptores y componentes compartidos
- `src/app/author`: gestión de autores
- `src/app/category`: gestión de categorías
- `src/app/game`: catálogo y edición de juegos
- `src/app/client`: gestión de clientes
- `src/app/loan`: gestión de préstamos
- `src/app/user`: gestión de usuarios

