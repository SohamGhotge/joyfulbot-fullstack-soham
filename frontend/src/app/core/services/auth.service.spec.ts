import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and store token', () => {
    const mockResponse = {
      success: true,
      message: 'Login successful',
      data: {
        token: 'mock-jwt-token',
        type: 'Bearer',
        id: 2,
        name: 'Soham Naik',
        email: 'soham.naik@joyfulbot.com',
        role: 'EMPLOYEE',
        departmentName: 'Engineering'
      }
    };

    service.login({ email: 'soham.naik@joyfulbot.com', password: 'Employee@123' }).subscribe(user => {
      expect(user.token).toBe('mock-jwt-token');
      expect(user.role).toBe('EMPLOYEE');
      expect(service.isLoggedIn()).toBe(true);
      expect(service.getToken()).toBe('mock-jwt-token');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should logout and clear token', () => {
    service.logout();
    expect(service.isLoggedIn()).toBe(false);
    expect(service.getToken()).toBeNull();
  });

  it('should return false when not logged in', () => {
    expect(service.isLoggedIn()).toBe(false);
  });
});
