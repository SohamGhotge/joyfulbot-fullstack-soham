import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.redirectByRole();
    }
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe(
      user => {
        this.loading = false;
        this.redirectByRole();
      },
      error => {
        this.loading = false;
        this.snackBar.open(error.error.message || 'Login failed', 'Close', { duration: 3000 });
      }
    );
  }

  redirectByRole() {
    const role = this.authService.getRole();
    if (role === 'MANAGER') {
      this.router.navigate(['/manager/dashboard']);
    } else {
      this.router.navigate(['/employee/dashboard']);
    }
  }

  getEmailError() {
    const email = this.loginForm.get('email');
    if (email.hasError('required')) return 'Email is required';
    if (email.hasError('email')) return 'Enter a valid email';
    return '';
  }

  getPasswordError() {
    const password = this.loginForm.get('password');
    if (password.hasError('required')) return 'Password is required';
    if (password.hasError('minlength')) return 'Password must be at least 6 characters';
    return '';
  }
}
