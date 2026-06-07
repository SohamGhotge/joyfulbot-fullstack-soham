import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { MyLeavesComponent } from './my-leaves/my-leaves.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'apply-leave', component: ApplyLeaveComponent },
      { path: 'my-leaves', component: MyLeavesComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [DashboardComponent, ApplyLeaveComponent, MyLeavesComponent, NavbarComponent],
  imports: [SharedModule, RouterModule.forChild(routes), FormsModule]
})
export class EmployeeModule { }
