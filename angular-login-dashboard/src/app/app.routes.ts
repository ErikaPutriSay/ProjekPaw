import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/Login.component';
import { DashboardComponent } from './Pages/dashboard.component';

// Komponen Dashboard & Fitur Umum
import { DashboardHomeComponent } from './Pages/dashboard-home.component';

// Fitur Bills
import { BillListComponent } from './Pages/bill-list.component';
import { AddBillComponent } from './Pages/add-bill.component';
import { EditBillComponent } from './Pages/edit-bill.component';

// Fitur Schedule
import { ScheduleListComponent } from './Pages/schedule-list.component';
import { AddScheduleComponent } from './Pages/add-schedule.component';

// Fitur Students (Participants)
import { ParticipantListComponent } from './Pages/participant-list.component'; // Tambahkan ini
import { AddParticipantComponent } from './Pages/add-participant.component';
import { EditStudentComponent } from './Pages/edit-student.component'; // Nama class yang sudah kita perbaiki

// Fitur Teachers
import { TeacherListComponent } from './Pages/teacher-list.component';
import { AddTeacherComponent } from './Pages/add-teacher.component';
import { EditTeacherComponent } from './Pages/edit-teacher.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: DashboardHomeComponent },
      
      // Routes untuk Bill
      { path: 'bill-list', component: BillListComponent },
      { path: 'add-bill', component: AddBillComponent },
      { path: 'edit-bill/:id', component: EditBillComponent },
      
      // Routes untuk Schedule
      { path: 'schedule-list', component: ScheduleListComponent },
      { path: 'add-schedule', component: AddScheduleComponent },
      
      // Routes untuk Student / Participants
      { path: 'participants', component: ParticipantListComponent }, // Diubah agar menampilkan LIST, bukan form ADD
      { path: 'add-participant', component: AddParticipantComponent },
      { path: 'edit-student/:id', component: EditStudentComponent }, // Sesuai dengan parameter ID
      
      // Routes untuk Teacher
      { path: 'teachers', component: TeacherListComponent },
      { path: 'add-teacher', component: AddTeacherComponent },
      { path: 'edit-teacher/:id', component: EditTeacherComponent },
    ]
  }
];