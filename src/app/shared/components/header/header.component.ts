import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';
import { ProfileService } from '../../services/profile.service';
import { Subscription, delay, filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  activeItem: string = '/';
  showProfileMenu: boolean = false;
  showMobileMenu: boolean = false;
  accountInfo: AccountInfo | null =
    this.msalService.instance.getActiveAccount();
  profileImage = '';

  constructor(
    private router: Router,
    private msalService: MsalService,
    private profileService: ProfileService
  ) {
    this.subscription = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((event: any) => {
        console.log(event.url);
        this.activeItem = event.url;
      });
  }

  ngOnInit(): void {
    this.profileImage = this.profileService.profilePhoto();
  }

  onShowProfileClicked() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  onMobileMenuClicked() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  logout() {
    this.msalService.logoutRedirect();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
