import { Component } from '@angular/core';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
})
export class HeaderComponent {
  constructor(private authService: AuthenticationService, private router: Router) {}

  logout() {
    this.authService.logout();
  }
}
