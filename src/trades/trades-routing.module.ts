import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TradesComponent } from './trades.component';

const loginRoutes : Routes = [
  {path: 'trades', component: TradesComponent}
]

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule]
})

export class TradesRoutingModule {}
