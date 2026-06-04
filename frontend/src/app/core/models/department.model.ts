export interface Department {
  id: number;
  name: string;
  managerName: string;
}

export interface LeaveType {
  id: number;
  name: string;
  maxDaysPerYear: number;
  description: string;
}

export interface Analytics {
  pending: number;
  approved: number;
  rejected: number;
  total: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
