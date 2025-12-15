// src/app/pages/edit-schedule.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Schedule } from '../Services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  imports: [FormsModule]
})
export class EditScheduleComponent implements OnInit {
  schedule: Schedule | undefined = undefined;
  scheduleDay = '';
  scheduleTime = '';
  selectedTeacher = '';
  selectedStudent = '';

  teachers = ['Herna Marlindawati', 'Meiliana Tirtadjaya', 'Umi Muslikhatun'];
  students = ['Mike Celiano Sutanto', 'Giselle Naomi Sutanto'];

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = parseInt(idParam, 10);
      this.schedule = this.dataService.getScheduleById(id);
      if (this.schedule) {
        this.scheduleDay = this.schedule.day;
        this.scheduleTime = this.schedule.time;
        this.selectedTeacher = this.schedule.teacher;
        this.selectedStudent = this.schedule.student;
      }
    }
  }

  updateSchedule() {
    if (!this.schedule || !this.scheduleDay || !this.scheduleTime || !this.selectedTeacher || !this.selectedStudent) {
      alert('Please fill all fields');
      return;
    }

    const updatedSchedule: Schedule = {
      ...this.schedule,
      day: this.scheduleDay,
      time: this.scheduleTime,
      teacher: this.selectedTeacher,
      student: this.selectedStudent
    };

    this.dataService.updateSchedule(updatedSchedule);

    alert('Schedule updated successfully!');
    this.router.navigate(['/dashboard/schedule-list']);
  }

  cancel() {
    this.router.navigate(['/dashboard/schedule-list']);
  }
}