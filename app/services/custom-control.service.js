import { Control } from '@angular/common';

export class CustomControl extends Control {
  constructor(model, validator, config = {}) {
    super(model, validator);

    this.config = config;
    this.model = model;
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

  reset() {
    // Workaround until this is fixed
    // https://github.com/angular/angular/issues/4933
    this._pristine = true;
    this._touched = false;
    this._valid = true;
    this.updateValue(this.model);
  }
}
