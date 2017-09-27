import { Component, OnInit } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html'
})

export class AlertComponent {
  message: any;

  constructor(private alertService : AlertService) {}

  ngOnInit() {
    this.alertService.retrieveMessage().subscribe(message => {this.message = message})
  }
}
