import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { StatisticsComponent } from './statistics/statistics.component';
import { SettingsComponent } from './settings/components/settings/settings.component';
import { HomeComponent } from './shared/components/home/home.component';
import { GeneralStatisticsComponent } from './statistics/general-statistics/general-statistics.component';
import { ProjectStatisticsComponent } from './statistics/project-statistics/project-statistics.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: HomeComponent,
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
        component: StatisticsComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'general-statistics',
        component: GeneralStatisticsComponent 
      },
      { 
        path: 'project-statistics',
        component: ProjectStatisticsComponent
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
