import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-manager-navbar',
  templateUrl: './manager-navbar.component.html',
  styleUrls: ['./manager-navbar.component.scss']
})
export class ManagerNavbarComponent implements OnInit {

  userName: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    this.userName = user ? user.name : '';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
