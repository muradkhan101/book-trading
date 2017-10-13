import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ModalContentService } from './modal-content.service';
import { ModalContainerComponent } from './modal-container.component';
import { TradeFromComponent } from './trade-form.component';
import { ModalComponent } from './modal.component';
import { ModalDirective } from './modal.directive';

import { AlertModule } from '../alert/alert.module';

@NgModule({
  imports: [
    CommoneModule,
    ReactiveFormsModule,
    AlertModule
  ],
  declarations : [
    ModalContainerComponent,
    ModalComponent,
    ModalDirective,
    TradeFromComponent
  ],
  providers : [ ModalContentService ]
})
