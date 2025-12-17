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


  // Untuk edit inline
  teachers = ['Herna Marlindawati', 'Meiliana Tirtadjaya', 'Umi Muslikhatun'];
  students = ['Mike Celiano Sutanto', 'Giselle Naomi Sutanto'];
  editRowId: number | null = null;
  editDay = '';
  editTime = '';
  editTeacher = '';
  editStudent = '';

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

  startInlineEdit(schedule: any) {
    this.editRowId = schedule.id;
    this.editDay = schedule.day;
    this.editTime = schedule.time;
    this.editTeacher = schedule.teacher;
    this.editStudent = schedule.student;
  }

  saveInlineEdit(id: number) {
    const idx = this.schedules.findIndex(s => s.id === id);
    if (idx !== -1) {
      this.schedules[idx] = {
        ...this.schedules[idx],
        day: this.editDay,
        time: this.editTime,
        teacher: this.editTeacher,
        student: this.editStudent
      };
    }
    this.editRowId = null;
  }

  cancelInlineEdit() {
    this.editRowId = null;
  }

  deleteSchedule(id: number) {
    this.schedules = this.schedules.filter(s => s.id !== id);
  }

  backToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  noop() {}
}