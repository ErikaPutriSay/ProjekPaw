// src/app/services/data.service.ts

import { Injectable } from '@angular/core';

export interface Schedule {
  id: number;
  day: string;
  time: string;
  teacher: string;
  student: string;
}

export interface Bill {
  id: number;
  student: string;
  price: number;
  month: string;
  status: string;
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private schedules: Schedule[] = [
    { id: 1, day: 'Monday', time: '11:23', teacher: 'Herna Marlindawati', student: 'Mike Celiano Sutanto' },
    { id: 2, day: 'Tuesday', time: '11:26', teacher: 'Meiliana Tirtadjaya', student: 'Mike Celiano Sutanto' },
    { id: 3, day: 'Tuesday', time: '09:49', teacher: 'Umi Muslikhatun', student: 'Giselle Naomi Sutanto' },
    { id: 4, day: 'Monday', time: '11:00', teacher: 'Meiliana Tirtadjaya', student: 'Giselle Naomi Sutanto' },
    { id: 5, day: 'Monday', time: '11:04', teacher: 'Umi Muslikhatun', student: 'Giselle Naomi Sutanto' },
    { id: 6, day: 'Monday', time: '17:26', teacher: 'Meiliana Tirtadjaya', student: 'Giselle Naomi Sutanto' }
  ];

  private bills: Bill[] = [
    { id: 1, student: 'Giselle Naomi Sutanto', price: 200000, month: 'November 2024', status: 'PAID' },
    { id: 2, student: 'Mike Celiano Sutanto', price: 150000, month: 'December 2024', status: 'UNPAID' }
  ];

  getSchedules(): Schedule[] {
    return [...this.schedules]; // Return copy to avoid direct mutation
  }

  getScheduleById(id: number): Schedule | undefined {
    return this.schedules.find(s => s.id === id);
  }

  addSchedule(schedule: Omit<Schedule, 'id'>): void {
    const newId = this.schedules.length > 0 ? Math.max(...this.schedules.map(s => s.id)) + 1 : 1;
    this.schedules.push({ ...schedule, id: newId });
  }

  updateSchedule(updatedSchedule: Schedule): void {
    const index = this.schedules.findIndex(s => s.id === updatedSchedule.id);
    if (index !== -1) {
      this.schedules[index] = updatedSchedule;
    }
  }

  deleteSchedule(id: number): void {
    this.schedules = this.schedules.filter(s => s.id !== id);
  }

  getBills(): Bill[] {
    return [...this.bills];
  }

  getBillById(id: number): Bill | undefined {
    return this.bills.find(b => b.id === id);
  }

  addBill(bill: Omit<Bill, 'id'>): void {
    const newId = this.bills.length > 0 ? Math.max(...this.bills.map(b => b.id)) + 1 : 1;
    this.bills.push({ ...bill, id: newId });
  }

  updateBill(updatedBill: Bill): void {
    const index = this.bills.findIndex(b => b.id === updatedBill.id);
    if (index !== -1) {
      this.bills[index] = updatedBill;
    }
  }

  deleteBill(id: number): void {
    this.bills = this.bills.filter(b => b.id !== id);
  }
}