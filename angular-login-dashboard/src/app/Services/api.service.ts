// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getSchedules(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.baseUrl}/schedules`));
  }

  addSchedule(schedule: any): Promise<any> {
    return firstValueFrom(this.http.post(`${this.baseUrl}/schedules`, schedule));
  }

  getSchedule(id: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.baseUrl}/schedules/${id}`));
  }

  deleteSchedule(id: string): Promise<any> {
    return firstValueFrom(this.http.delete(`${this.baseUrl}/schedules/${id}`));
  }

  // Participants API
  getParticipants(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.baseUrl}/participants`));
  }

  getParticipant(id: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.baseUrl}/participants/${id}`));
  }

  createParticipant(participant: any): Promise<any> {
    return firstValueFrom(this.http.post(`${this.baseUrl}/participants`, participant));
  }

  updateParticipant(id: string, participant: any): Promise<any> {
    return firstValueFrom(this.http.put(`${this.baseUrl}/participants/${id}`, participant));
  }

  deleteParticipant(id: string): Promise<any> {
    return firstValueFrom(this.http.delete(`${this.baseUrl}/participants/${id}`));
  }

  // Teachers API
  getTeachers(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.baseUrl}/teachers`));
  }

  getTeacher(id: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.baseUrl}/teachers/${id}`));
  }

  createTeacher(teacher: any): Promise<any> {
    return firstValueFrom(this.http.post(`${this.baseUrl}/teachers`, teacher));
  }

  updateTeacher(id: string, teacher: any): Promise<any> {
    return firstValueFrom(this.http.put(`${this.baseUrl}/teachers/${id}`, teacher));
  }

  deleteTeacher(id: string): Promise<any> {
    return firstValueFrom(this.http.delete(`${this.baseUrl}/teachers/${id}`));
  }

  // Bills API
  getBills(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.baseUrl}/bills`));
  }

  getBill(id: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.baseUrl}/bills/${id}`));
  }

  createBill(bill: any): Promise<any> {
    return firstValueFrom(this.http.post(`${this.baseUrl}/bills`, bill));
  }

  updateBill(id: string, bill: any): Promise<any> {
    return firstValueFrom(this.http.put(`${this.baseUrl}/bills/${id}`, bill));
  }

  deleteBill(id: string): Promise<any> {
    return firstValueFrom(this.http.delete(`${this.baseUrl}/bills/${id}`));
  }
}