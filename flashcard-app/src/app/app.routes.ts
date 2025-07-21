import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./pages/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'sets',
    loadComponent: () => import('./pages/flashcard-sets.component').then(m => m.FlashcardSetsComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./pages/edit-set.component').then(m => m.EditSetComponent)
  },
  {
    path: 'study/:id',
    loadComponent: () => import('./pages/study.component').then(m => m.StudyComponent)
  },
  { path: '**', redirectTo: '/home' }
];
