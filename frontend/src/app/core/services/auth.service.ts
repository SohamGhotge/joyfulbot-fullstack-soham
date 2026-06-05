import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../models/user.model';
import { ApiResponse } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<AuthResponse>;
  public currentUser$: Observable<AuthResponse>;

  constructor(private http: HttpClient) {
    const stored = localStorage.getItem('elms_user');
    this.currentUserSubject = new BehaviorSubject<AuthResponse>(stored ? JSON.parse(stored) : null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/auth/login`, request).pipe(
      map(response => {
        const user = response.data;
        localStorage.setItem('elms_user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  register(request: RegisterRequest): Observable<any> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/auth/register`, request);
  }

  logout(): void {
    localStorage.removeItem('elms_user');
    this.currentUserSubject.next(null);
  }

  getToken(): string {
    const user = this.currentUserSubject.value;
    return user ? user.token : null;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  getCurrentUser(): AuthResponse {
    return this.currentUserSubject.value;
  }

  getRole(): string {
    const user = this.currentUserSubject.value;
    return user ? user.role : null;
  }
}
