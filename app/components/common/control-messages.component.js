import { Component, Host, Input } from '@angular/core';
import { ValidationService } from '../../services/validation.service';
import template from './control-messages.template.html';

@Component({
  selector: 'control-messages',
  template: template
})
export class ControlMessages {
  @Input() control;

  constructor() {}

  get errorMessage() {
    for (let error in this.control.errors) {
      if (this.control.isInvalid()) {
        return this.control.getErrorMessage(error);
      }
    }

    return null;
  }
}
