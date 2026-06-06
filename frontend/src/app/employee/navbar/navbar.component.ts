import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

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
