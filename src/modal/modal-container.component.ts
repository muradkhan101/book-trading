import { Component, AfterViewInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';

import { ModalContentService } from './modal-content.service';
import { ModalDirective } from './modal-directive';
import { ModalContent } from './modal-content';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'modal',
  template: `
  <div ngClass="modal fade" id="main-modal">
    <div ngClass="modal-dialog" role="document">
      <div ngClass="modal-content">
        <ng-template modal-content></ng-template>
      </div>
    </div>
  </div>
  `
})

export class ModalContainerComponent {
  subscription : Subscription<ModalContent>;
  @ViewChild(ModalDirective) modalContent: ModalDirective;

  constructor(private cfr : ComponentFactoryResolver, public modalService : ModalContentService) {}

  ngAfterViewInit() {
    this.subscription = this.modalService.getContent().subscribe(content => this.loadComponent(content));
  }

  loadComponent(content : ModalContent) {
    let componentFactory = this.cfr.resolveComponentFactory(content.component);
    let viewContainerRef = this.modalContent.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<ModalComponent>componentRef.instance).data = content.data;
  }
  ngOnDestroy() { this.subscription.unsubscribe(); }
}
