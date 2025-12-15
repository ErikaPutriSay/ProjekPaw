import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/Login.component';
import { DashboardComponent } from './Pages/dashboard.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent }
];
