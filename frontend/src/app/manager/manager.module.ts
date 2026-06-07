import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { TeamLeavesComponent } from './team-leaves/team-leaves.component';
import { ManagerNavbarComponent } from './manager-navbar/manager-navbar.component';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: ManagerNavbarComponent,
    children: [
      { path: 'dashboard', component: ManagerDashboardComponent },
      { path: 'team-leaves', component: TeamLeavesComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [
    ManagerDashboardComponent,
    TeamLeavesComponent,
    ManagerNavbarComponent,
    ReviewDialogComponent
  ],
  imports: [SharedModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  entryComponents: [ReviewDialogComponent]
})
export class ManagerModule { }
