import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../Services/api.service';
import { NotificationService } from '../Services/notification.service';

@Component({
  standalone: true,
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  imports: [FormsModule, CommonModule]
})
export class EditTeacherComponent implements OnInit {
  id: string | null = null;
  model: any = { name: '', dateOfBirth: '', phone: '', email: '', address: '', education: '', position: '', subject: '' };
  loading = false;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router, private notify: NotificationService) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.loadTeacher(this.id);
  }

  private async loadTeacher(id: string) {
    this.loading = true;
    try {
      const t = await this.api.getTeacher(id);
      if (t) {
        this.model.name = t.name || '';
        this.model.dateOfBirth = t.dateOfBirth ? new Date(t.dateOfBirth).toISOString().slice(0,10) : '';
        this.model.phone = t.phone || '';
        this.model.email = t.email || '';
        this.model.address = t.address || '';
        this.model.education = t.education || '';
        this.model.position = t.notes || '';
        this.model.subject = t.subject || '';
      }
    } catch (err) {
      console.error(err);
      this.notify.show('Failed to load teacher');
    } finally {
      this.loading = false;
    }
  }

  async save() {
    if (!this.model.name) { this.notify.show('Name is required'); return; }
    try {
      await this.api.updateTeacher(this.id || '', {
        name: this.model.name,
        dateOfBirth: this.model.dateOfBirth,
        phone: this.model.phone,
        email: this.model.email,
        address: this.model.address,
        subject: this.model.subject,
        notes: this.model.position || ''
      });
      this.notify.show('Data tersimpan semuanya');
      this.router.navigate(['/dashboard/teachers']);
    } catch (err) {
      console.error(err);
      this.notify.show('Failed to update teacher');
    }
  }

  cancel() { this.router.navigate(['/dashboard/teachers']); }
}
