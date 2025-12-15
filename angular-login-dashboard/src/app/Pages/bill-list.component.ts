// src/app/pages/bill-list.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, Bill } from '../Services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  imports: [FormsModule, CommonModule]
})
export class BillListComponent implements OnInit {
  bills: Bill[] = [];

  constructor(private dataService: DataService, public router: Router) {}

  ngOnInit() {
    this.loadBills();
  }

  loadBills() {
    this.bills = this.dataService.getBills();
  }

  editBill(id: number) {
    this.router.navigate(['/dashboard/edit-bill', id]);
  }

  deleteBill(id: number) {
    if (confirm('Are you sure you want to delete this bill?')) {
      this.dataService.deleteBill(id);
      this.loadBills(); // Refresh list
    }
  }

  addNewBill() {
    this.router.navigate(['/dashboard/add-bill']);
  }
}