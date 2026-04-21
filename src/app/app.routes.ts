import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/games', pathMatch: 'full'},
    { path: 'auth', loadComponent: () => import('@/app/auth/auth-form').then(m => m.AuthForm)},
    { path: 'categories', loadComponent: () => import('@/app/category/category-list').then(m => m.CategoryList)},
    { path: 'authors', loadComponent: () => import('@/app/author/author-list').then(m => m.AuthorList)},
    { path: 'games', loadComponent: () => import('@/app/game/game-list').then(m => m.GameList)},
    { path: 'clients', loadComponent: () => import('@/app/client/client-list').then(m => m.ClientList)},
    { path: 'loans', loadComponent: () => import('@/app/loan/loan-list').then(m => m.LoanList)}
];
