import { Routes } from '@angular/router';
import { SampleEntitiesComponent } from './component/sample-entities/sample-entities.component';
import { BolletteDashboardComponent } from './component/bollette-dashboard/bollette-dashboard.component';
import { AuthComponent } from './component/auth/auth.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { 
    path: 'bollette', 
    component: BolletteDashboardComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'sample-entities', 
    component: SampleEntitiesComponent,
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/login' }
];

