import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // WAJIB untuk [(ngModel)]
import { CommonModule } from '@angular/common'; // WAJIB untuk *ngIf atau [disabled]

@Component({
  selector: 'app-edit-student',
  standalone: true, // Pastikan ini ada jika menggunakan Angular 17+
  imports: [FormsModule, CommonModule], // Tambahkan import ini agar form tidak error
  templateUrl: './edit-student.component.html',
  // HAPUS ATAU KOMENTAR BARIS DI BAWAH INI:
  // styleUrls: ['./edit-student.component.css'] 
  styles: [] // Gunakan ini saja jika ingin styling kosong
})
// UBAH NAMA CLASS INI: Dari EditParticipantComponent menjadi EditStudentComponent
export class EditStudentComponent implements OnInit {
  model: any = {
    name: '',
    grade: '',
    email: '',
    phone: '',
    address: '',
    level: '',
    status: '',
    dateOfBirth: '',
    registrationDate: ''
  };

  id: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.fetchData();
    }
  }

  fetchData() {
    console.log('Fetching data for ID:', this.id);
  }

  update() {
    console.log('Data yang dikirim:', this.model);
    alert('Data Student Berhasil Diupdate!');
    this.router.navigate(['/dashboard/manage-students']); 
  }

  cancel() {
    this.router.navigate(['/dashboard/manage-students']);
  }
}