import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LeaveService } from './leave.service';
import { environment } from '../../../environments/environment';

describe('LeaveService', () => {
  let service: LeaveService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LeaveService]
    });
    service = TestBed.get(LeaveService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get my leaves', () => {
    const mockResponse = {
      success: true,
      message: 'Leaves fetched successfully',
      data: {
        content: [
          {
            id: 1,
            employeeName: 'Soham Naik',
            leaveTypeName: 'Casual Leave',
            startDate: '2025-12-01',
            endDate: '2025-12-02',
            totalDays: 2,
            reason: 'Personal work',
            status: 'PENDING',
            appliedAt: '2025-11-01T10:00:00'
          }
        ],
        totalElements: 1,
        totalPages: 1,
        size: 10,
        number: 0
      }
    };

    service.getMyLeaves(0, 10).subscribe(data => {
      expect(data.content.length).toBe(1);
      expect(data.content[0].status).toBe('PENDING');
      expect(data.totalElements).toBe(1);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/leaves?page=0&size=10`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get leave balances', () => {
    const mockResponse = {
      success: true,
      message: 'Balances fetched successfully',
      data: [
        { leaveTypeId: 1, leaveTypeName: 'Casual Leave', totalDays: 12, usedDays: 5, remainingDays: 7, year: 2025 }
      ]
    };

    service.getBalances().subscribe(data => {
      expect(data.length).toBe(1);
      expect(data[0].remainingDays).toBe(7);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/leaves/balance`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
