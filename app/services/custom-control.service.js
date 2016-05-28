import { Control } from '@angular/common';

export class CustomControl extends Control {
  config;

  constructor(model, validator, config = {}) {
    super(model, validator);

    this.config = config;
  }

  get errorConfig() {
    return this.config;
  }

  setErrorConfig(config) {
    this.config = config;
  }

  getErrorMessage(propertyName) {
    if (!this.config[propertyName]) return null;

    return this.config[propertyName];
  }

  isInvalid() {
    return !this.valid && (!this.pristine || this.touched);
  }
}
