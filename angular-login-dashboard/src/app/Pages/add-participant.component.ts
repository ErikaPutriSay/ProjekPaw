import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import { NotificationService } from '../Services/notification.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  imports: [FormsModule, CommonModule]
})
export class AddParticipantComponent {
  model: any = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    language: 'English',
    notes: ''
  };

  saving = false;

  constructor(private api: ApiService, private router: Router, private notify: NotificationService) {}

  async save() {
    this.saving = true;
    try {
      await this.api.createParticipant(this.model);
      this.notify.show('Data tersimpan semuanya');
      this.router.navigate(['/dashboard/participants']);
    } catch (err: any) {
      console.error(err);
      this.notify.show(err?.error?.error || 'Failed to create');
    } finally {
      this.saving = false;
    }
  }
}
