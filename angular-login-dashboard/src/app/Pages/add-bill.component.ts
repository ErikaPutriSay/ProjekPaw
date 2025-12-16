// src/app/pages/add-bill.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';
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

  constructor(private dataService: DataService, private router: Router) {}

  submitBill() {
    if (!this.selectedStudent || this.price <= 0 || !this.month) {
      alert('Please fill all required fields');
      return;
    }

    this.dataService.addBill({
      student: this.selectedStudent,
      price: this.price,
      month: this.month,
      status: this.status
    });

    alert('Bill created successfully!');
    this.router.navigate(['/dashboard/bill-list']);
  }

  backToBills() {
    this.router.navigate(['/dashboard/bill-list']);
  }

  cancel() {
    this.router.navigate(['/dashboard/bill-list']);
  }
}