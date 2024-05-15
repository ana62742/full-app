import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MSAL_INSTANCE,
  MsalBroadcastService,
  MsalGuard,
  MsalInterceptor,
  MsalModule,
  MsalRedirectComponent,
  MsalService,
} from '@azure/msal-angular';
import { InteractionType } from '@azure/msal-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
<<<<<<< HEAD
import { DxButtonModule, DxPopupModule, DxTemplateModule, DxTextBoxModule } from 'devextreme-angular';
=======
import {
  DxButtonModule,
  DxTextBoxModule,
  DxTooltipModule,
} from 'devextreme-angular';
>>>>>>> fc9419b643d8bbccdc708411389b64d91b00dea0
import { SettingsModule } from './settings/settings.module';
import { StatisticsModule } from './statistics/statistics.module';
import {
  MS_GRAPH_URL,
  MSALInsanceFactory,
  msalConfig,
} from './auth/auth.config';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './shared/components/home/home.component';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    SettingsModule,
    StatisticsModule,
    DxButtonModule,
    DxTextBoxModule,
<<<<<<< HEAD
    DxPopupModule,
    DxTemplateModule
=======
    DxTooltipModule,
    MsalModule.forRoot(
      MSALInsanceFactory(),
      {
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: msalConfig.scopes,
        },
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([[MS_GRAPH_URL, msalConfig.scopes]]),
      }
    ),
>>>>>>> fc9419b643d8bbccdc708411389b64d91b00dea0
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInsanceFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}
