import { Component, OnDestroy, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';
import { msalConfig } from './auth/auth.config';
import { ProfileService } from './shared/services/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(async () => {
        if (!this.authenticated) {
          await this.logIn();
        }
      });

    this.msalService.handleRedirectObservable().subscribe({
      next: (result: AuthenticationResult) => {
        if (
          !this.msalService.instance.getActiveAccount() &&
          this.msalService.instance.getAllAccounts().length > 0
        ) {
          this.msalService.instance.setActiveAccount(result.account);
        }
      },
      error: (error) => console.log(error),
    });

    this.authenticated && this.profileService.getProfilePhoto();
  }

  async logIn() {
    await this.msalService.instance.loginRedirect({
      scopes: msalConfig.scopes,
      redirectUri: msalConfig.appUrl,
    });
  }

  get authenticated(): boolean {
    return this.msalService.instance.getActiveAccount() ? true : false;
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
