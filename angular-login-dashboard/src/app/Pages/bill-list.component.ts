// src/app/pages/bill-list.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bill } from '../Services/data.service';
import { ApiService } from '../Services/api.service';
import { NotificationService } from '../Services/notification.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  imports: [FormsModule, CommonModule]
})
export class BillListComponent implements OnInit {
  bills: any[] = [];
  allBills: any[] = [];
  searchQuery: string = '';

  constructor(private api: ApiService, public router: Router, private notify: NotificationService) {}

  ngOnInit() {
    this.loadBills();
  }

  async loadBills() {
    try {
      this.allBills = await this.api.getBills();
      this.bills = [...this.allBills];
    } catch (err) {
      console.error('Failed to load bills', err);
      const status = (err as any)?.status;
      if (status === 404) {
        return;
      }
      const msg = (err as any)?.error?.error || (err as any)?.message || 'Failed to load bills';
      this.notify.show(msg);
    }
  }

  searchBills() {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      this.bills = [...this.allBills];
    } else {
      this.bills = this.allBills.filter(bill => bill.student.toLowerCase().includes(query));
    }
  }

  // editBill(id: number) {
  //   this.router.navigate(['/dashboard/edit-bill', id]);
  // }

  // Di dalam class BillListComponent
editBill(id: string) {
  // Ini akan mengarahkan ke rute /dashboard/edit-bill/ID_TAGIHAN
  this.router.navigate(['/dashboard/edit-bill', id]);
}

  async deleteBill(id: string) {
    const ok = await this.notify.confirm('Yakin ingin menghapus tagihan ini?');
    if (!ok) return;
    try {
      await this.api.deleteBill(id);
      this.loadBills();
    } catch (err) {
      console.error(err);
      const msg = (err as any)?.error?.error || (err as any)?.message || 'Gagal menghapus tagihan';
      this.notify.show(msg);
    }
  }

  addNewBill() {
    this.router.navigate(['/dashboard/add-bill']);
  }
}