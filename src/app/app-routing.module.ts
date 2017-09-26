import { NgModule } from '@angular/core';
//Routes is an object linking paths to components, or redirecting placing
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UserInfoComponent } from '../user/user-info.component';

const appRoutes: Routes = [
  {path: 'user/profile', component: UserInfoComponent},
  {path: '', component: AppComponent, pathMatch: 'full'}
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
