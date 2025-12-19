import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../Services/api.service';
import { NotificationService } from '../Services/notification.service';

@Component({
  standalone: true,
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  imports: [FormsModule, CommonModule]
})
export class AddTeacherComponent {
  model: any = {
    name: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    address: '',
    education: '',
    position: '',
    subject: ''
  };
  saving = false;

  constructor(private api: ApiService, private router: Router, private notify: NotificationService) {}

  async save() {
    if (!this.model.name) {
      this.notify.show('Name is required');
      return;
    }
    this.saving = true;
    try {
      await this.api.createTeacher({
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
    } catch (err: any) {
      console.error(err);
      const msg = (err as any)?.error?.error || (err as any)?.message || 'Failed to create teacher';
      this.notify.show(msg);
    } finally {
      this.saving = false;
    }
  }

  cancel() {
    this.router.navigate(['/dashboard/teachers']);
  }
}
