import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffingUpComponent } from './components/staffing-up/staffing-up.component';
import { ResizeDirective } from '../shared/directives/resize.directive';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { StaffingUpRoutingModule } from './staffing-up.routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [StaffingUpComponent, ResizeDirective],
  imports: [
    CommonModule,
    StaffingUpRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    SharedModule
  ],
})
export class StaffingUpModule {}
