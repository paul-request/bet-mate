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

  constructor(ngFormModel) {
    this._formModel = ngFormModel;
  }

  get errorMessage() {
    // Find the control in the Host (Parent) form
    const ctrl = this._formModel.form.find(this.controlName);

    for (let propertyName in ctrl.errors) {
	     // If control has a error
      if (ctrl.errors.hasOwnProperty(propertyName) && ctrl.touched) {
 	      // Return the appropriate error message from the Validation Service
        // return ValidationService.getValidatorErrorMessage(propertyName);
        return 'test message';
      }
    }

    return null;
  }
}
