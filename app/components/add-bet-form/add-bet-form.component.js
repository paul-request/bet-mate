import moment from 'moment';
import { Component } from '@angular/core';
import { FormBuilder, ControlGroup, Control, Validators } from '@angular/common';

import { ValidationService } from '../../services/validation.service';
import { BetStoreService } from '../../services/bet-store.service';
import { CustomControl } from '../../services/custom-control.service';
import { errorConfig } from './add-bet-form-errors.config';
import { BetModel } from  '../../models/bet.model';
import { ControlMessages } from '../common/control-messages.component';
import { BET_FIELDS, INPUT_DEBOUNCE, MOMENT_DATE_FORMAT } from  '../../constants/constants';

import template from './add-bet-form.template.html';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'add-bet-form',
  template: template,
  directives: [ControlMessages]
})
export class AddBetFormComponent {
  static get parameters() {
    return [[BetStoreService], [FormBuilder]];
  }

  constructor(betStore, formBuilder) {
    this.types = BET_FIELDS.TYPES;
    this.events = BET_FIELDS.EVENTS;
    this.bookmakers = BET_FIELDS.BOOKMAKERS;
    this.exchanges = BET_FIELDS.EXCHANGES;

    this._betStore = betStore;
    this._formBuilder = formBuilder;
    this.bet = new BetModel();
    this.errorConfig = errorConfig;

    this.buildForm();
    this.setupTransforms();
  }

  buildForm() {
    this.value = new CustomControl(
      this.bet.value,
      Validators.compose([
        Validators.required, ValidationService.currencyValidator
      ]),
      this.errorConfig.value
    );

    this.event = new CustomControl(
      this.bet.event,
      Validators.required,
      this.errorConfig.event
    );

    this.type = new CustomControl(
      this.bet.type,
      Validators.required,
      this.errorConfig.type
    );

    this.eventDate = new CustomControl(
      this.bet.eventDate,
      Validators.compose(
        [Validators.required, ValidationService.dateValidator]
      ),
      this.errorConfig.eventDate
    );

    this.exchange = new CustomControl(
      this.bet.exchange,
      Validators.required,
      this.errorConfig.exchange
    );

    this.bookmaker = new CustomControl(
      this.bet.bookmaker,
      Validators.required,
      this.errorConfig.bookmaker
    );

    this.outcome = new CustomControl(
      this.bet.outcome,
      Validators.compose([
        Validators.required, ValidationService.currencyValidator
      ]),
      this.errorConfig.outcome
    );

    this.betForm = this._formBuilder.group({
      bookmaker: this.bookmaker,
      exchange: this.exchange,
      eventDate: this.eventDate,
      type: this.type,
      event: this.event,
      value: this.value,
      outcome: this.outcome
    });
  }

  setupTransforms() {
    this.value.valueChanges
      .debounceTime(INPUT_DEBOUNCE)
      .map(value => parseFloat(value).toFixed(2))
      .filter(value => !this.value.isInvalid())
      .subscribe(value => this.bet.value = value);

    this.outcome.valueChanges
      .debounceTime(INPUT_DEBOUNCE)
      .map(value => parseFloat(value).toFixed(2))
      .filter(value => !this.outcome.isInvalid())
      .subscribe(value => this.bet.outcome = value);

    this.bet.eventDate = this.eventDate.valueChanges
      .debounceTime(INPUT_DEBOUNCE)
      .map(value => moment(value, MOMENT_DATE_FORMAT, true).toISOString())
      .filter(value => !this.eventDate.isInvalid())
      .subscribe(value => this.bet.eventDate = value);
  }

  save() {
    this._betStore.create(this.bet);

    this.bet = new BetModel();

    this.reset();
  }

  reset() {
    // There is no way to reset a form built with FormBuilder
    // https://github.com/angular/angular/issues/4933
    Object.keys(this.betForm.controls).forEach(controlName => {
      this.betForm.controls[controlName].reset();
    });
  }
}
