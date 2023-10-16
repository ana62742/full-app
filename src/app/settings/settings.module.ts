import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from './components/settings/settings.component';
import { DxButtonModule, DxFileUploaderModule } from 'devextreme-angular';

@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule, SharedModule, DxFileUploaderModule, DxButtonModule],
})
export class SettingsModule {}
