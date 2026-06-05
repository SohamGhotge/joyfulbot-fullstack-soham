import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LeaveApplication, PageResponse } from '../models/leave.model';
import { Analytics, ApiResponse } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTeamLeaves(page: number = 0, size: number = 10, status?: string): Observable<PageResponse<LeaveApplication>> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<ApiResponse<PageResponse<LeaveApplication>>>(`${this.apiUrl}/manager/team-leaves`, { params }).pipe(
      map(response => response.data)
    );
  }

  getAnalytics(): Observable<Analytics> {
    return this.http.get<ApiResponse<Analytics>>(`${this.apiUrl}/manager/analytics`).pipe(
      map(response => response.data)
    );
  }
}
