import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../Layout/navbar.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../Services/api.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [NavbarComponent, FormsModule, RouterModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  totalStudents = 0;
  totalTeachers = 0;
  totalSchedules = 0;
  totalBills = 0;
  currentTime = '';
  currentDate = '';
  private clockTimer: any = null;

  constructor(private api: ApiService) {}

  async ngOnInit() {
    await this.loadCounts();
    this.startClock();
  }

  ngOnDestroy() {
    if (this.clockTimer) clearInterval(this.clockTimer);
  }

  private startClock() {
    const update = () => {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      this.currentDate = now.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };
    update();
    this.clockTimer = setInterval(update, 1000);
  }

  private async loadCounts() {
    try {
      const students = await this.api.getParticipants();
      this.totalStudents = Array.isArray(students) ? students.length : 0;
    } catch (e) {
      console.error('Failed to load participants count', e);
    }

    try {
      const teachers = await this.api.getTeachers();
      this.totalTeachers = Array.isArray(teachers) ? teachers.length : 0;
    } catch (e) {
      console.error('Failed to load teachers count', e);
    }

    try {
      const schedules = await this.api.getSchedules();
      this.totalSchedules = Array.isArray(schedules) ? schedules.length : 0;
    } catch (e) {
      console.error('Failed to load schedules count', e);
    }

    try {
      const bills = await this.api.getBills();
      this.totalBills = Array.isArray(bills) ? bills.length : 0;
    } catch (e) {
      console.error('Failed to load bills count', e);
    }
  }
}