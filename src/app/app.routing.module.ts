import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/components/signin/signin.component';
import { AuthGuard } from './auth.guard';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    pathMatch: 'full',
    component: AppComponent,
  },
  {
    path: 'staffing-up',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./staffing-up/staffing-up.module').then(
        (m) => m.StaffingUpModule
      ),
  },
  { path: 'auth', component: SigninComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
