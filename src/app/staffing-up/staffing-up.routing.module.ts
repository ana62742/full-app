import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffingUpComponent } from './components/staffing-up/staffing-up.component';

const routes: Routes = [{ path: '', component: StaffingUpComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffingUpRoutingModule {}
