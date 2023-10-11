import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
})
export class HeaderComponent {
  constructor(private authService: AuthenticationService) {}

  logout() {
    this.authService.logout();
  }
}
