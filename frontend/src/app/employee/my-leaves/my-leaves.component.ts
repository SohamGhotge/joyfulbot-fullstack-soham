import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LeaveService } from '../../core/services/leave.service';
import { LeaveApplication } from '../../core/models/leave.model';

@Component({
  selector: 'app-my-leaves',
  templateUrl: './my-leaves.component.html',
  styleUrls: ['./my-leaves.component.scss']
})
export class MyLeavesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  leaves: LeaveApplication[] = [];
  displayedColumns = ['leaveType', 'startDate', 'endDate', 'totalDays', 'reason', 'status', 'appliedAt', 'actions'];
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
    private leaveService: LeaveService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadLeaves();
  }

  loadLeaves(page: number = 0) {
    this.loading = true;
    this.leaveService.getMyLeaves(page, this.pageSize, this.selectedStatus).subscribe(
      data => {
        this.leaves = data.content;
        this.totalElements = data.totalElements;
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.snackBar.open('Failed to load leaves', 'Close', { duration: 3000 });
      }
    );
  }

  onStatusChange() {
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    this.loadLeaves(0);
  }

  onPageChange(event: any) {
    this.loadLeaves(event.pageIndex);
  }

  cancelLeave(id: number) {
    if (!confirm('Are you sure you want to cancel this leave application?')) return;
    this.leaveService.cancelLeave(id).subscribe(
      () => {
        this.snackBar.open('Leave cancelled successfully', 'Close', { duration: 3000 });
        this.loadLeaves(this.paginator.pageIndex);
      },
      error => {
        this.snackBar.open(error.error.message || 'Failed to cancel leave', 'Close', { duration: 3000 });
      }
    );
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase()}`;
  }
}
