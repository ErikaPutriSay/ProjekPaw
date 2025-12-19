// src/app/pages/edit-bill.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bill } from '../Services/data.service';
import { ApiService } from '../Services/api.service';
import { NotificationService } from '../Services/notification.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  imports: [FormsModule, CommonModule]
})
export class EditBillComponent implements OnInit {
  bill: Bill | undefined = undefined;
  selectedStudent = '';
  price = 0;
  month = '';
  status = 'PAID';

  students = ['Giselle Naomi Sutanto', 'Mike Celiano Sutanto'];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private notify: NotificationService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadBill(id);
  }

  private async loadBill(id: string) {
    try {
      const b: any = await this.api.getBill(id);
      if (b) {
        this.bill = b;
        this.selectedStudent = b.student;
        this.price = b.price;
        this.month = b.month;
        this.status = b.status;
      }
    } catch (err) {
      console.error(err);
      this.notify.show('Failed to load bill');
    }
  }

  async updateBill() {
    if (!this.bill || !this.selectedStudent || this.price <= 0 || !this.month) {
      this.notify.show('Silakan isi semua bidang yang diperlukan');
      return;
    }

    try {
      const id = (this.bill as any)?._id ?? (this.bill as any)?.id;
      await this.api.updateBill(id, {
        student: this.selectedStudent,
        price: this.price,
        month: this.month,
        status: this.status
      });
      this.notify.show('Data tersimpan semuanya');
      this.router.navigate(['/dashboard/bill-list']);
    } catch (err) {
      console.error(err);
      this.notify.show('Failed to update bill');
    }
  }

  backToBills() {
    this.router.navigate(['/dashboard/bill-list']);
  }

  cancel() {
    this.router.navigate(['/dashboard/bill-list']);
  }
}