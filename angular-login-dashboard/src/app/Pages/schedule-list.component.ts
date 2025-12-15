// src/app/pages/schedule-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  imports: [FormsModule, CommonModule]
})
export class ScheduleListComponent implements OnInit {
  schedules: any[] = [
    { id: 1, day: 'Monday', time: '11:23', teacher: 'Herna Marlindawati', student: 'Mike Celiano Sutanto' },
    { id: 2, day: 'Tuesday', time: '11:26', teacher: 'Meiliana Tirtadjaya', student: 'Mike Celiano Sutanto' },
    { id: 3, day: 'Tuesday', time: '09:49', teacher: 'Umi Muslikhatun', student: 'Giselle Naomi Sutanto' },
    { id: 4, day: 'Monday', time: '11:00', teacher: 'Meiliana Tirtadjaya', student: 'Giselle Naomi Sutanto' },
    { id: 5, day: 'Monday', time: '11:04', teacher: 'Umi Muslikhatun', student: 'Giselle Naomi Sutanto' },
    { id: 6, day: 'Monday', time: '17:26', teacher: 'Meiliana Tirtadjaya', student: 'Giselle Naomi Sutanto' }
  ];
  searchQuery = '';

  constructor(public router: Router) {}

  ngOnInit() {}

  filteredSchedules() {
    if (!this.searchQuery) {
      return this.schedules;
    }
    return this.schedules.filter(s => s.student.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  addNewSchedule() {
    this.router.navigate(['/dashboard/add-schedule']);
  }

  editSchedule(id: number) {
    this.router.navigate(['/dashboard/edit-schedule', id]);
  }

  deleteSchedule(id: number) {
    this.schedules = this.schedules.filter(s => s.id !== id);
  }

  backToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}