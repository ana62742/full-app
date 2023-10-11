import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffingUpComponent } from './components/staffing-up/staffing-up.component';
import { ResizeDirective } from '../shared/directives/resize.directive';
import {
  DxButtonModule,
  DxDataGridModule,
  DxTagBoxModule,
} from 'devextreme-angular';
import { StaffingUpRoutingModule } from './staffing-up.routing.module';
import { HeaderComponent } from '../shared/components/header/header.component';

@NgModule({
  declarations: [StaffingUpComponent, HeaderComponent, ResizeDirective],
  imports: [
    CommonModule,
    StaffingUpRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    DxTagBoxModule,
  ],
})
export class StaffingUpModule {}
