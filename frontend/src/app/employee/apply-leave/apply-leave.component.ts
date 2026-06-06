import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LeaveService } from '../../core/services/leave.service';
import { DepartmentService } from '../../core/services/department.service';
import { LeaveType } from '../../core/models/department.model';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.scss']
})
export class ApplyLeaveComponent implements OnInit {

  applyForm: FormGroup;
  loading = false;
  leaveTypes: LeaveType[] = [];
  totalDays = 0;
  minDate = new Date();

  constructor(
    private fb: FormBuilder,
    private leaveService: LeaveService,
    private departmentService: DepartmentService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.applyForm = this.fb.group({
      leaveTypeId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.departmentService.getLeaveTypes().subscribe(
      data => this.leaveTypes = data,
      error => this.snackBar.open('Failed to load leave types', 'Close', { duration: 3000 })
    );

    this.applyForm.get('startDate').valueChanges.subscribe(() => this.calculateDays());
    this.applyForm.get('endDate').valueChanges.subscribe(() => this.calculateDays());
  }

  calculateDays() {
    const start = this.applyForm.get('startDate').value;
    const end = this.applyForm.get('endDate').value;
    if (start && end) {
      let count = 0;
      const current = new Date(start);
      const endDate = new Date(end);
      while (current <= endDate) {
        const day = current.getDay();
        if (day !== 0 && day !== 6) count++;
        current.setDate(current.getDate() + 1);
      }
      this.totalDays = count;
    }
  }

  onSubmit() {
    if (this.applyForm.invalid) return;
    this.loading = true;
    const formValue = this.applyForm.value;
    const request = {
      leaveTypeId: formValue.leaveTypeId,
      startDate: this.formatDate(formValue.startDate),
      endDate: this.formatDate(formValue.endDate),
      reason: formValue.reason
    };
    this.leaveService.applyLeave(request).subscribe(
      () => {
        this.loading = false;
        this.snackBar.open('Leave applied successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/employee/my-leaves']);
      },
      error => {
        this.loading = false;
        this.snackBar.open(error.error.message || 'Failed to apply leave', 'Close', { duration: 3000 });
      }
    );
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  getReasonError() {
    const reason = this.applyForm.get('reason');
    if (reason.hasError('required')) return 'Reason is required';
    if (reason.hasError('minlength')) return 'Reason must be at least 10 characters';
    return '';
  }
}
