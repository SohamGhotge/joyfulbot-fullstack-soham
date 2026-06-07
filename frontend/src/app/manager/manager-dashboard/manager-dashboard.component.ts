import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ManagerService } from '../../core/services/manager.service';
import { AuthService } from '../../core/services/auth.service';
import { Analytics } from '../../core/models/department.model';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.scss']
})
export class ManagerDashboardComponent implements OnInit {

  analytics: Analytics = { pending: 0, approved: 0, rejected: 0, total: 0 };
  loading = false;
  userName: string;

  constructor(
    private managerService: ManagerService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    this.userName = user ? user.name : '';
    this.loadAnalytics();
  }

  loadAnalytics() {
    this.loading = true;
    this.managerService.getAnalytics().subscribe(
      data => {
        this.analytics = data;
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.snackBar.open('Failed to load analytics', 'Close', { duration: 3000 });
      }
    );
  }
}
