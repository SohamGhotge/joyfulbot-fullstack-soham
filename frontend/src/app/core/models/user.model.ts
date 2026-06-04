export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  departmentName: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  name: string;
  email: string;
  role: string;
  departmentName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  departmentId: number;
}
