import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ChildrenComponent } from './children/children.component';
import { SponsorshipComponent } from './sponsorship/sponsorship.component';
import { CrisisComponent } from './crisis/crisis.component';

import { AuthGuard } from '../auth/auth.guard';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'children', component: ChildrenComponent },
          { path: 'crisis', component: CrisisComponent },
          { path: 'sponsorship', component: SponsorshipComponent },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}
