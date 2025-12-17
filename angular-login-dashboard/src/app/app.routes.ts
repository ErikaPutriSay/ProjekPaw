
import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/Login.component';
import { DashboardComponent } from './Pages/dashboard.component';



import { BillListComponent } from './Pages/bill-list.component';
import { AddBillComponent } from './Pages/add-bill.component';
import { EditBillComponent } from './Pages/edit-bill.component';
import { ScheduleListComponent } from './Pages/schedule-list.component';
import { AddScheduleComponent } from './Pages/add-schedule.component';
import { DashboardHomeComponent } from './Pages/dashboard-home.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'bill-list', component: BillListComponent },
      { path: 'add-bill', component: AddBillComponent },
      { path: 'edit-bill/:id', component: EditBillComponent },
      { path: 'schedule-list', component: ScheduleListComponent },
      { path: 'add-schedule', component: AddScheduleComponent },
      // tambahkan child routes lain jika perlu
    ]
  }
];
