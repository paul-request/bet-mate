import { Component, Host } from '@angular/core';
import { NgFormModel } from '@angular/common';
import { ValidationService } from '../../services/validation.service';
import template from './control-messages.template.html';

@Component({
  selector: 'control-messages',
  inputs: ['controlName: control'],
  template: template,
})
export class ControlMessages {
  static get parameters() {
    return [[NgFormModel]];
  }

  constructor(@Host() ngFormModel) {
    this._form = ngFormModel.form;
  }

  get errorMessage() {
    // Find the control in the Host (Parent) form
    const ctrl = this._form.form.find(this.controlName);

    for (let propertyName in ctrl.errors) {
	  // If control has a error
      if (ctrl.errors.hasOwnProperty(propertyName) && ctrl.touched) {
 	    // Return the appropriate error message from the Validation Service
        return ValidationService.getValidatorErrorMessage(propertyName);
      }
    }

    return null;
  }
}
