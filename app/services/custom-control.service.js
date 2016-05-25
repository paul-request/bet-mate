import { Control } from '@angular/common';

export class CustomControl extends Control {
  eConfig;

  constructor(model, validator, asyncValidator, eConfig = {}) {
    super(model, validator, asyncValidator);

    this.eConfig = eConfig;
  }

  get errorConfig() {
    return this.eConfig;
  }

  setErrorConfig(config) {
    this.eConfig = config;
  }

  getErrorMessage(propertyName) {
    if (!this.eConfig[propertyName]) return null;

    return this.eConfig[propertyName];
  }
}
