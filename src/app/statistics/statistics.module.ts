import { NgModule } from '@angular/core';
import { DxPieChartModule } from 'devextreme-angular';
import { StatisticsComponent } from './statistics.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [DxPieChartModule, SharedModule]

})
export class StatisticsModule {}