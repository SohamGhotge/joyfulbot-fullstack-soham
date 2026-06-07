import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ManagerService } from '../../core/services/manager.service';
import { LeaveService } from '../../core/services/leave.service';
import { LeaveApplication } from '../../core/models/leave.model';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';

@Component({
  selector: 'app-team-leaves',
  templateUrl: './team-leaves.component.html',
  styleUrls: ['./team-leaves.component.scss']
})
export class TeamLeavesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  leaves: LeaveApplication[] = [];
  displayedColumns = ['employeeName', 'leaveType', 'startDate', 'endDate', 'totalDays', 'reason', 'status', 'appliedAt', 'actions'];
  loading = false;
  totalElements = 0;
  pageSize = 10;
  selectedStatus = '';

  statusOptions = [
    { value: '', label: 'All' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'APPROVED', label: 'Approved' },
    { value: 'REJECTED', label: 'Rejected' }
  ];

  constructor(
    private managerService: ManagerService,
    private leaveService: LeaveService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadLeaves();
  }

  loadLeaves(page: number = 0) {
    this.loading = true;
    this.managerService.getTeamLeaves(page, this.pageSize, this.selectedStatus).subscribe(
      data => {
        this.leaves = data.content;
        this.totalElements = data.totalElements;
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.snackBar.open('Failed to load team leaves', 'Close', { duration: 3000 });
      }
    );
  }

  onStatusChange() {
    this.paginator.pageIndex = 0;
    this.loadLeaves(0);
  }

  onPageChange(event: any) {
    this.loadLeaves(event.pageIndex);
  }

  openReviewDialog(leave: LeaveApplication, action: string) {
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      width: '400px',
      data: { leave, action }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (action === 'approve') {
          this.approveLeave(leave.id, result);
        } else {
          this.rejectLeave(leave.id, result);
        }
      }
    });
  }

  approveLeave(id: number, remarks: string) {
    this.leaveService.approveLeave(id, remarks).subscribe(
      () => {
        this.snackBar.open('Leave approved successfully', 'Close', { duration: 3000 });
        this.loadLeaves(this.paginator.pageIndex);
      },
      error => this.snackBar.open(error.error.message || 'Failed to approve leave', 'Close', { duration: 3000 })
    );
  }

  rejectLeave(id: number, remarks: string) {
    this.leaveService.rejectLeave(id, remarks).subscribe(
      () => {
        this.snackBar.open('Leave rejected successfully', 'Close', { duration: 3000 });
        this.loadLeaves(this.paginator.pageIndex);
      },
      error => this.snackBar.open(error.error.message || 'Failed to reject leave', 'Close', { duration: 3000 })
    );
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase()}`;
  }
}
