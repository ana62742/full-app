import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';
import { ProfileService } from '../../services/profile.service';
import { Subscription, delay, filter } from 'rxjs';
import { msalConfig } from 'src/app/auth/auth.config';

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
  profileImage =
    'https://pics.craiyon.com/2023-06-01/935f45ddfe174fc7adf76cf812ea1d5b.webp';

  constructor(
    private router: Router,
    private msalService: MsalService,
    private profileService: ProfileService
  ) {
    this.subscription = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.activeItem = event.url;
      });
  }

  ngOnInit(): void {
    this.profileImage = this.profileService.profilePhoto().length
      ? this.profileService.profilePhoto()
      : JSON.parse(localStorage.getItem('userData') ?? '').photoURL;
  }

  onShowProfileClicked() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  onMobileMenuClicked() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  logout() {
    this.msalService.logoutRedirect({
      postLogoutRedirectUri: msalConfig.appUrl,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
