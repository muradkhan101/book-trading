import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ModalContentService } from './modal-content.service';
import { ModalContainerComponent } from './modal-container.component';
import { TradeFormComponent } from '../trades/trade-form.component';
import { ModalDirective } from './modal.directive';

import { AlertModule } from '../alert/alert.module';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlertModule,
    DirectivesModule
  ],
  declarations : [
    ModalContainerComponent,
    ModalDirective,
    TradeFormComponent
  ],
  providers : [ ModalContentService ],
  exports : [ ModalContainerComponent ],
  entryComponents : [ TradeFormComponent ]
})

export class ModalModule {}
