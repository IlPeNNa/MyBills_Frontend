import { Routes } from '@angular/router';
import { SampleEntitiesComponent } from './component/sample-entities/sample-entities.component';
import { BolletteDashboardComponent } from './component/bollette-dashboard/bollette-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/bollette', pathMatch: 'full' },
  { path: 'bollette', component: BolletteDashboardComponent },
  { path: 'sample-entities', component: SampleEntitiesComponent }
];

