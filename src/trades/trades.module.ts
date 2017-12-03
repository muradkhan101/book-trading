import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradesRoutingModule } from './trades-routing.module';
import { TradesComponent } from './trades.component';
import { TradeViewComponent } from './trade-view.component';
import { TradeManagementService } from './trade-management.service';
import { AlertModule } from '../alert/alert.module';

@NgModule({
  imports: [
    CommonModule,
    TradesRoutingModule,
    AlertModule
  ],
  declarations: [
    TradesComponent,
    TradeViewComponent,
  ],
  providers: [
    TradeManagementService
  ],
  exports : [ TradesComponent ]
})

export class TradesModule {}
