import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import { NotificationService } from '../Services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  imports: [CommonModule]
})
export class TeacherListComponent implements OnInit {
  teachers: any[] = [];
  loading = false;

  constructor(private api: ApiService, private router: Router, private notify: NotificationService) {}

  ngOnInit() {
    this.loadTeachers();
  }

  async loadTeachers() {
    this.loading = true;
    try {
      this.teachers = await this.api.getTeachers();
    } catch (err) {
      console.error('Failed to load teachers', err);
      const status = (err as any)?.status;
      // suppress notification for 404 Not Found (avoid noisy popup)
      if (status === 404) {
        return;
      }
      const msg = (err as any)?.error?.error || (err as any)?.message || 'Failed to load teachers';
      this.notify.show(msg);
    } finally {
      this.loading = false;
    }
  }

  addTeacher() {
    this.router.navigate(['/dashboard/add-teacher']);
  }

  editTeacher(id: string) {
    this.router.navigate(['/dashboard/edit-teacher', id]);
  }

  async deleteTeacher(id: string) {
    const ok = await this.notify.confirm('Hapus guru ini?');
    if (!ok) return;
    try {
      await this.api.deleteTeacher(id);
      this.loadTeachers();
    } catch (err) {
      console.error(err);
      const msg = (err as any)?.error?.error || (err as any)?.message || 'Gagal menghapus guru';
      this.notify.show(msg);
    }
  }
}
