// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getSchedules(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.baseUrl}/schedules`));
  }

  addSchedule(schedule: any): Promise<any> {
    return firstValueFrom(this.http.post(`${this.baseUrl}/schedules`, schedule));
  }
}