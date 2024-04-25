import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserUtils } from '@azure/msal-browser';

import { AuthGuard } from './auth/auth.guard';
import { AppComponent } from './app.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SettingsComponent } from './settings/components/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./staffing-up/staffing-up.module').then(
            (m) => m.StaffingUpModule
          ),
      },
      {
        path: 'statistics',
        component: StatisticsComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
