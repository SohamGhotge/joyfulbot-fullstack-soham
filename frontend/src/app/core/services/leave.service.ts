import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LeaveApplication, LeaveBalance, LeaveApplicationRequest, PageResponse } from '../models/leave.model';
import { ApiResponse } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  applyLeave(request: LeaveApplicationRequest): Observable<LeaveApplication> {
    return this.http.post<ApiResponse<LeaveApplication>>(`${this.apiUrl}/leaves`, request).pipe(
      map(response => response.data)
    );
  }

  getMyLeaves(page: number = 0, size: number = 10, status?: string): Observable<PageResponse<LeaveApplication>> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<ApiResponse<PageResponse<LeaveApplication>>>(`${this.apiUrl}/leaves`, { params }).pipe(
      map(response => response.data)
    );
  }

  getLeaveById(id: number): Observable<LeaveApplication> {
    return this.http.get<ApiResponse<LeaveApplication>>(`${this.apiUrl}/leaves/${id}`).pipe(
      map(response => response.data)
    );
  }

  cancelLeave(id: number): Observable<any> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/leaves/${id}`);
  }

  getBalances(): Observable<LeaveBalance[]> {
    return this.http.get<ApiResponse<LeaveBalance[]>>(`${this.apiUrl}/leaves/balance`).pipe(
      map(response => response.data)
    );
  }

  approveLeave(id: number, remarks: string): Observable<LeaveApplication> {
    return this.http.put<ApiResponse<LeaveApplication>>(`${this.apiUrl}/leaves/${id}/approve`, { remarks }).pipe(
      map(response => response.data)
    );
  }

  rejectLeave(id: number, remarks: string): Observable<LeaveApplication> {
    return this.http.put<ApiResponse<LeaveApplication>>(`${this.apiUrl}/leaves/${id}/reject`, { remarks }).pipe(
      map(response => response.data)
    );
  }
}
