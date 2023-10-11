import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from './environments/environment';

import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { AppRoutingModule } from './app.routing.module';
import { StaffingUpComponent } from './components/staffing-up/staffing-up.component';
import { HomeComponent } from './home/home.component';
import { DxButtonModule, DxDataGridModule, DxTextBoxModule } from 'devextreme-angular';
import { ResizeDirective } from './directives/resize.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    StaffingUpComponent,
    ResizeDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    DxDataGridModule,
    DxButtonModule,
    DxTextBoxModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
