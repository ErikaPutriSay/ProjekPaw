import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-schedule-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './schedule-list.component.html'
})
export class ScheduleListComponent implements OnInit {
  // Pastikan variabel ini adalah ARRAY, bukan fungsi
  schedules: any[] = [];
  filteredSchedules: any[] = [];
  searchQuery: string = '';
  loading: boolean = true;

  constructor(
    private api: ApiService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.loadSchedules();
  }

  async loadSchedules() {
    this.loading = true;
    try {
      const data: any = await this.api.getSchedules();
      this.schedules = data || [];
      this.filteredSchedules = [...this.schedules];
    } catch (err) {
      console.error('Gagal memuat jadwal:', err);
    } finally {
      this.loading = false;
    }
  }

  // Perbaikan Error: onSearch harus ada
  onSearch() {
    const query = this.searchQuery.toLowerCase();
    this.filteredSchedules = this.schedules.filter(s => 
      s.student?.toLowerCase().includes(query) || 
      s.teacher?.toLowerCase().includes(query) ||
      s.day?.toLowerCase().includes(query)
    );
  }

  // Perbaikan Error: editSchedule harus ada
  editSchedule(id: string) {
    this.router.navigate(['/dashboard/edit-schedule', id]);
  }

  async deleteSchedule(id: string) {
    if (confirm('Are you sure you want to delete this schedule?')) {
      try {
        await this.api.deleteSchedule(id);
        this.loadSchedules(); // Refresh data
      } catch (err) {
        console.error('Error deleting schedule:', err);
      }
    }
  }
}