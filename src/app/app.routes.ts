import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/games', pathMatch: 'full'},
    { path: 'categories', loadComponent: () => import('@/app/category/category-list').then(m => m.CategoryList)},
    { path: 'authors', loadComponent: () => import('@/app/author/author-list').then(m => m.AuthorList)},
    { path: 'games', loadComponent: () => import('@/app/game/game-list').then(m => m.GameList)}
];
