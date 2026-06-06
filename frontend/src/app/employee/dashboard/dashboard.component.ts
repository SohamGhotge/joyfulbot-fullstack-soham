import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveService } from '../../core/services/leave.service';
import { AuthService } from '../../core/services/auth.service';
import { LeaveBalance, LeaveApplication } from '../../core/models/leave.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  balances: LeaveBalance[] = [];
  recentLeaves: LeaveApplication[] = [];
  loading = false;
  userName: string;

  constructor(
    private leaveService: LeaveService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    this.userName = user ? user.name : '';
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.leaveService.getBalances().subscribe(
      data => {
        this.balances = data;
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.snackBar.open('Failed to load data', 'Close', { duration: 3000 });
      }
    );

    this.leaveService.getMyLeaves(0, 5).subscribe(
      data => this.recentLeaves = data.content,
      error => console.error(error)
    );
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase()}`;
  }

  navigateToApply() {
    this.router.navigate(['/employee/apply-leave']);
  }
}
