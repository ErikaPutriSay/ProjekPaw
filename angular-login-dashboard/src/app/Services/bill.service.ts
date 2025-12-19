import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BillService {

  private API_URL = 'http://localhost:3000/api/bills';

  constructor(private http: HttpClient) {}

  getBills() {
    return this.http.get<any[]>(this.API_URL);
  }

  createBill(data: any) {
    return this.http.post(this.API_URL, data);
  }

  deleteBill(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  updateBill(id: string, data: any) {
    return this.http.put(`${this.API_URL}/${id}`, data);
  }
}
