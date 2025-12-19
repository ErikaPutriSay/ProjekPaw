import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service'; // Pastikan path benar
import { NotificationService } from '../Services/notification.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // WAJIB untuk perulangan daftar

@Component({
  standalone: true,
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  imports: [FormsModule, CommonModule]
})
export class AddScheduleComponent implements OnInit {
  scheduleDay = '';
  scheduleTime = '';
  selectedTeacher = '';
  selectedStudent = '';

  // Inisialisasi array kosong untuk menampung data dari database
  teachers: any[] = [];
  students: any[] = [];

  constructor(
    private api: ApiService, 
    private router: Router, 
    private notify: NotificationService
  ) {}

  // Fungsi yang otomatis jalan saat halaman dibuka
  async ngOnInit() {
    await this.loadAllData();
  }

  async loadAllData() {
    try {
      // 1. Ambil data Guru (Teachers)
      const teacherData = await this.api.getTeachers();
      this.teachers = Array.isArray(teacherData) ? teacherData : [];

      // 2. Ambil data Murid (Participants/Students)
      const studentData = await this.api.getParticipants();
      this.students = Array.isArray(studentData) ? studentData : [];

      console.log('Data Guru Terkoneksi:', this.teachers.length);
      console.log('Data Murid Terkoneksi:', this.students.length);
    } catch (e) {
      console.error('Gagal mengambil data:', e);
      this.notify.show('Gagal menghubungi server');
    }
  }

  async createSchedule() {
    if (!this.scheduleDay || !this.scheduleTime || !this.selectedTeacher || !this.selectedStudent) {
      this.notify.show('Mohon lengkapi semua data');
      return;
    }

    try {
      const payload = {
        day: this.scheduleDay,
        time: this.scheduleTime,
        teacher: this.selectedTeacher,
        student: this.selectedStudent
      };

      await this.api.addSchedule(payload);
      this.notify.show('Jadwal berhasil disimpan!');
      this.router.navigate(['/dashboard/schedule-list']);
    } catch (e) {
      this.notify.show('Gagal menyimpan jadwal');
    }
  }

  cancel() {
    this.router.navigate(['/dashboard/schedule-list']);
  }
}