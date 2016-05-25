import { Control } from '@angular/common';

export class CustomControl extends Control {
  conf;

  constructor(model, validator, asyncValidator, errorConfig) {
    super(model, validator, asyncValidator);

    this.conf = errorConfig;
  }

  get errorConfig() {
    return this.errorConfig;
  }

  getErrorMessage(propertyName) {
    if (!this.conf[propertyName]) return null;

    return this.conf[propertyName];
  }
}
