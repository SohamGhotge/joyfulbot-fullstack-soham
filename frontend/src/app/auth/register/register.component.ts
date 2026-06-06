import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';
import { DepartmentService } from '../../core/services/department.service';
import { Department } from '../../core/models/department.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  hidePassword = true;
  departments: Department[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private departmentService: DepartmentService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      departmentId: ['', Validators.required]
    });
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe(
      data => this.departments = data,
      error => this.snackBar.open('Failed to load departments', 'Close', { duration: 3000 })
    );
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
    this.loading = true;
    this.authService.register(this.registerForm.value).subscribe(
      () => {
        this.loading = false;
        this.snackBar.open('Registration successful. Please login.', 'Close', { duration: 3000 });
        this.router.navigate(['/auth/login']);
      },
      error => {
        this.loading = false;
        this.snackBar.open(error.error.message || 'Registration failed', 'Close', { duration: 3000 });
      }
    );
  }

  getNameError() {
    const name = this.registerForm.get('name');
    if (name.hasError('required')) return 'Name is required';
    if (name.hasError('minlength')) return 'Name must be at least 3 characters';
    return '';
  }

  getEmailError() {
    const email = this.registerForm.get('email');
    if (email.hasError('required')) return 'Email is required';
    if (email.hasError('email')) return 'Enter a valid email';
    return '';
  }

  getPasswordError() {
    const password = this.registerForm.get('password');
    if (password.hasError('required')) return 'Password is required';
    if (password.hasError('minlength')) return 'Password must be at least 6 characters';
    return '';
  }
}
