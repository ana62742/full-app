import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/components/signin/signin.component';
import { AuthGuard } from './auth.guard';
import { AppComponent } from './app.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SettingsComponent } from './settings/components/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    pathMatch: 'full',
    component: AppComponent,
  },
  {
    path: 'auth',
    component: SigninComponent,
  },
  {
    path: 'staffing-up',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./staffing-up/staffing-up.module').then(
        (m) => m.StaffingUpModule
      ),
  },
  {
    path: 'statistics',
    canActivate: [AuthGuard],
    component: StatisticsComponent,
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    component: SettingsComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
