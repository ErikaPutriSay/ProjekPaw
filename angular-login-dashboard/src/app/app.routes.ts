
import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/Login.component';
import { DashboardComponent } from './Pages/dashboard.component';
import { BillListComponent } from './Pages/bill-list.component';
import { ScheduleListComponent } from './Pages/schedule-list.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'bill-list', component: BillListComponent },
      { path: 'schedule-list', component: ScheduleListComponent },
      // tambahkan child routes lain jika perlu
    ]
  }
];
