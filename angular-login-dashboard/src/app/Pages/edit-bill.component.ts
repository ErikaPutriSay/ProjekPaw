// src/app/pages/edit-bill.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Bill } from '../Services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  imports: [FormsModule]
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
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = parseInt(idParam, 10);
      this.bill = this.dataService.getBillById(id);
      if (this.bill) {
        this.selectedStudent = this.bill.student;
        this.price = this.bill.price;
        this.month = this.bill.month;
        this.status = this.bill.status;
      }
    }
  }

  updateBill() {
    if (!this.bill || !this.selectedStudent || this.price <= 0 || !this.month) {
      alert('Please fill all required fields');
      return;
    }

    const updatedBill: Bill = {
      ...this.bill,
      student: this.selectedStudent,
      price: this.price,
      month: this.month,
      status: this.status
    };

    this.dataService.updateBill(updatedBill);

    alert('Bill updated successfully!');
    this.router.navigate(['/dashboard/bill-list']);
  }

  backToBills() {
    this.router.navigate(['/dashboard/bill-list']);
  }

  cancel() {
    this.router.navigate(['/dashboard/bill-list']);
  }
}