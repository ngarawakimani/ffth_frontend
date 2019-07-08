import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChildrenComponent } from './children/children.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CrisisComponent } from './crisis/crisis.component';
import { SponsorshipComponent } from './sponsorship/sponsorship.component';

@NgModule({
  declarations: [
    AppComponent,
    ChildrenComponent,
    LoginComponent,
    RegistrationComponent,
    CrisisComponent,
    SponsorshipComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
