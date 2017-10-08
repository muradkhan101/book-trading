import { NgModule } from '@angular/core';
//Routes is an object linking paths to components, or redirecting placing
import { Routes, RouterModule } from '@angular/router';

import { AppLandingComponent } from './app-landing.component';
import { UserInfoComponent } from '../user/user-info.component';
import { AuthGuard } from '../global_services/auth-guard.service';

const appRoutes: Routes = [
  {
    path: 'user/profile',
    component: UserInfoComponent,
    canActivate : [AuthGuard]
  },
  {path: '', component: AppLandingComponent, pathMatch: 'full'}
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
