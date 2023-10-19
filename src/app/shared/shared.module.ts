import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [RouterModule, HttpClientModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class SharedModule {}
