import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Untuk *ngFor dan *ngIf
import { Router } from '@angular/router';

@Component({
  selector: 'app-participant-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './participant-list.component.html',
  // Jika file CSS tidak ada, gunakan baris di bawah ini atau hapus styleUrls
  styles: [`
    .table-hover tbody tr:hover {
      background-color: #f8f9fa;
    }
  `]
})
export class ParticipantListComponent implements OnInit {
  // Data dummy sesuai dengan tampilan di gambar Anda
  participants: any[] = [
    { id: 1, firstName: 'ainuunerr', lastName: 'ddd', email: 'eeee@12', phone: '123' },
    { id: 2, firstName: 'ainuun', lastName: 'ddd', email: 'eeee@', phone: '123' },
    { id: 3, firstName: 'sss', lastName: 'sss', email: '222', phone: '11' },
    { id: 4, firstName: 'sev', lastName: 'a', email: '2aa', phone: 'dd' },
    { id: 5, firstName: 'wene', lastName: 'hassa', email: '@gni', phone: '123' },
    { id: 6, firstName: 'Tasya', lastName: 'Munary', email: 'munarytasyaika@gmail.com', phone: '081273048271' },
    { id: 7, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '08123456789' }
  ];

  loading: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Di sini nantinya Anda bisa memanggil API untuk mengambil data asli
  }

  addParticipant() {
    this.router.navigate(['/dashboard/add-participant']);
  }

  editParticipant(id: number) {
    // Navigasi ke halaman edit dengan ID siswa
    this.router.navigate(['/dashboard/edit-student', id]);
  }

  deleteParticipant(id: number) {
    if (confirm('Are you sure you want to delete this participant?')) {
      this.participants = this.participants.filter(p => p.id !== id);
      alert('Participant deleted successfully');
    }
  }
}