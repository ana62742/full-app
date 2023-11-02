import { NgModule } from '@angular/core';
import { DxFunnelModule, DxPieChartModule } from 'devextreme-angular';
import { StatisticsComponent } from './statistics.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [DxPieChartModule, SharedModule, DxFunnelModule],
})
export class StatisticsModule {}
