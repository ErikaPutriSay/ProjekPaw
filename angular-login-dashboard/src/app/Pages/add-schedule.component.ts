// src/app/pages/add-schedule.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  imports: [FormsModule]
})
export class AddScheduleComponent {
  scheduleDay = '';
  scheduleTime = '';
  selectedTeacher = '';
  selectedStudent = '';

  teachers = ['Herna Marlindawati', 'Meiliana Tirtadjaya', 'Umi Muslikhatun'];
  students = ['Mike Celiano Sutanto', 'Giselle Naomi Sutanto'];

  constructor(private dataService: DataService, private router: Router) {}

  createSchedule() {
    if (!this.scheduleDay || !this.scheduleTime || !this.selectedTeacher || !this.selectedStudent) {
      alert('Please fill all fields');
      return;
    }

    this.dataService.addSchedule({
      day: this.scheduleDay,
      time: this.scheduleTime,
      teacher: this.selectedTeacher,
      student: this.selectedStudent
    });

    alert('Schedule created successfully!');
    this.router.navigate(['/dashboard/schedule-list']);
  }

  cancel() {
    this.router.navigate(['/dashboard/schedule-list']);
  }
}