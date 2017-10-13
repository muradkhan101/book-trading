import { Component, Input, AfterViewInit, ViewChild, ComponentFactoryResolver } from '@angular/core';

import { ModalDirective } from './modal-directive';
import { ModalContent } from './modal-content';

@Component({
  selector: 'modal',
  template: `
  <div ngClass="modal fade" id="trade-modal">
    <div ngClass="modal-dialog" role="document">
      <div ngClass="modal-content">
        <ng-template modal-content></ng-template>
      </div>
    </div>
  </div>
  `
})

export class ModalContainerComponent {
  @Input() content : ModalContent;
  @ViewChild(ModalDirective) modalContent: ModalDirective;

  constructor(private cfr : ComponentFactoryResolver) {}

  ngAfterViewInit() {
    this.loadComponent(this.content);
  }

  loadComponent(content : ModalContent) {
    let componentFactory = this.cfr.resolveComponentFactory(content.component);
    let viewContainerRef = this.modalContent.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<ModalComponent>componentRef.instance).data = content.data;
  }
}
