import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Department, LeaveType, ApiResponse } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<Department[]> {
    return this.http.get<ApiResponse<Department[]>>(`${this.apiUrl}/departments`).pipe(
      map(response => response.data)
    );
  }

  getLeaveTypes(): Observable<LeaveType[]> {
    return this.http.get<ApiResponse<LeaveType[]>>(`${this.apiUrl}/leave-types`).pipe(
      map(response => response.data)
    );
  }
}
