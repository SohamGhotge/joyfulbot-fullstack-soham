export interface LeaveApplication {
  id: number;
  employeeName: string;
  employeeEmail: string;
  leaveTypeName: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: string;
  appliedAt: string;
  reviewedByName: string;
  reviewedAt: string;
  remarks: string;
}

export interface LeaveBalance {
  leaveTypeId: number;
  leaveTypeName: string;
  totalDays: number;
  usedDays: number;
  remainingDays: number;
  year: number;
}

export interface LeaveApplicationRequest {
  leaveTypeId: number;
  startDate: string;
  endDate: string;
  reason: string;
}

export interface ReviewRequest {
  remarks: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
