import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { SigninComponent } from './auth/components/signin/signin.component';
import { AppRoutingModule } from './app.routing.module';
import { DxButtonModule, DxTextBoxModule } from 'devextreme-angular';

@NgModule({
  declarations: [AppComponent, SigninComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    DxButtonModule,
    DxTextBoxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
