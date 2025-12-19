// src/app/pages/add-bill.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import { NotificationService } from '../Services/notification.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  imports: [FormsModule]
})
export class AddBillComponent {
  selectedStudent = '';
  price = 0;
  month = '';
  status = 'PAID';

  students = ['Giselle Naomi Sutanto', 'Mike Celiano Sutanto'];

  constructor(private api: ApiService, private router: Router, private notify: NotificationService) {}

  async submitBill() {
    if (!this.selectedStudent || this.price <= 0 || !this.month) {
      this.notify.show('Silakan isi semua bidang yang diperlukan');
      return;
    }

    try {
      await this.api.createBill({
        student: this.selectedStudent,
        price: this.price,
        month: this.month,
        status: this.status
      });
      this.notify.show('Data tersimpan semuanya');
      this.router.navigate(['/dashboard/bill-list']);
    } catch (err) {
      console.error(err);
      const msg = (err as any)?.error?.error || (err as any)?.message || 'Failed to create bill';
      this.notify.show(msg);
    }
  }

  backToBills() {
    this.router.navigate(['/dashboard/bill-list']);
  }

  cancel() {
    this.router.navigate(['/dashboard/bill-list']);
  }
}