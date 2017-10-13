import { Injectable, Type } from '@angular/core';

import { ModalContent } from './modal-content';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalContentService {
  content = new Subject<ModalContent>();

  setContent(component : Type<any>, data : any) {
    this.content.next(new ModalContent(component, data));
  }
  clearContent() {
    this.content.next();
  }
  getContent() {
    return this.content.asObservable();
  }
}
