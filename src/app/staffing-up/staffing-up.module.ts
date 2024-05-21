import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffingUpComponent } from './components/staffing-up/staffing-up.component';
import {
  DxButtonModule,
  DxDataGridModule,
  DxPopupModule,
  DxResizableModule,
  DxTemplateModule,
} from 'devextreme-angular';
import { DxSwitchModule } from 'devextreme-angular';
import { StaffingUpRoutingModule } from './staffing-up.routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [StaffingUpComponent],
  imports: [
    CommonModule,
    StaffingUpRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    DxSwitchModule,
    DxResizableModule,
    SharedModule,
    DxPopupModule,
    DxTemplateModule,
  ],
})
export class StaffingUpModule {}
