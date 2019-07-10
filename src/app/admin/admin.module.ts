import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import { APIInterceptor } from '../auth_interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { ChildrenComponent } from './children/children.component';
import { SponsorshipComponent } from './sponsorship/sponsorship.component';
import { CrisisComponent } from './crisis/crisis.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    ChildrenComponent,
    SponsorshipComponent,
    CrisisComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true },
  ]
})
export class AdminModule {}
