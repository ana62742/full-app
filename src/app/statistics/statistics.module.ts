import { NgModule } from '@angular/core';
import { DxButtonModule, DxChartModule, DxFunnelModule, DxPieChartModule, DxResponsiveBoxModule, DxSelectBoxModule, DxToolbarModule } from 'devextreme-angular';
import { StatisticsComponent } from './statistics.component';
import { SharedModule } from '../shared/shared.module';
import { GeneralStatisticsComponent } from './general-statistics/general-statistics.component';
import { ProjectStatisticsComponent } from './project-statistics/project-statistics.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [StatisticsComponent, GeneralStatisticsComponent, ProjectStatisticsComponent],
  imports: [
    DxPieChartModule,
    SharedModule, 
    CommonModule,
    DxFunnelModule, 
    DxSelectBoxModule,
    DxToolbarModule, 
    DxChartModule,
    DxResponsiveBoxModule,
    DxButtonModule
  ],
})
export class StatisticsModule {}
