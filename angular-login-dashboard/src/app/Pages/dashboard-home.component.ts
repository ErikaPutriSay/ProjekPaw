import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../Services/api.service';

@Component({
  standalone: true,
  selector: 'app-dashboard-home',
  imports: [CommonModule],
  templateUrl: './dashboard-home.component.html'
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
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
      this.currentTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
      this.currentDate = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };
    update();
    this.clockTimer = setInterval(update, 1000);
  }

  async loadCounts() {
    try {
      const [st, tc, sc, bl] = await Promise.all([
        this.api.getParticipants(),
        this.api.getTeachers(),
        this.api.getSchedules(),
        this.api.getBills()
      ]);
      this.totalStudents = Array.isArray(st) ? st.length : 0;
      this.totalTeachers = Array.isArray(tc) ? tc.length : 0;
      this.totalSchedules = Array.isArray(sc) ? sc.length : 0;
      this.totalBills = Array.isArray(bl) ? bl.length : 0;
    } catch (e) {
      console.error('Error loading stats', e);
    }
  }
}