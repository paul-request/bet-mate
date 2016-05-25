import { Component } from '@angular/core';
import { ControlGroup, Control, Validators } from '@angular/common';

import { ValidationService } from '../../services/validation.service';
import { BetStoreService } from '../../services/bet-store.service';
import { CustomControl } from '../../services/custom-control.service';
import template from './add-bet-form.template.html';
import { errorConfig } from './add-bet-form-errors.config';
import { BetModel } from  '../../models/bet.model';
import { ControlMessages } from '../common/control-messages.component';
import { BET_TYPES, BET_EVENTS, BOOKMAKERS, EXCHANGES } from  '../../constants/constants';

@Component({
  selector: 'add-bet-form',
  template: template,
  directives: [ControlMessages]
})
export class AddBetFormComponent {
  static get parameters() {
    return [[BetStoreService]];
  }

  constructor(betStore) {
    this.types = BET_TYPES;
    this.events = BET_EVENTS;
    this.bookmakers = BOOKMAKERS;
    this.exchanges = EXCHANGES;

    this._betStore = betStore;

    this.bet = new BetModel();

    this.errorConfig = errorConfig;

    this.buildForm();
  }

  buildForm() {
    this.formControlGroup = new ControlGroup({
      bookmaker: new CustomControl(
        this.bet.bookmaker,
        Validators.required,
        null,
        this.errorConfig.bookmaker
      ),
      exchange: new CustomControl(
        this.bet.exchange,
        Validators.required,
        null,
        this.errorConfig.exchange
      ),
      eventDate: new CustomControl(
        this.bet.eventDate,
        Validators.compose(
          [Validators.required, ValidationService.dateValidator]
        ),
        null,
        this.errorConfig.eventDate
      ),
      type: new CustomControl(
        this.bet.type,
        Validators.required,
        null,
        this.errorConfig.type
      ),
      event: new CustomControl(
        this.bet.event,
        Validators.required,
        null,
        this.errorConfig.event
      ),
      value: new CustomControl(
        this.bet.value,
        Validators.compose([
          Validators.required, ValidationService.currencyValidator
        ]),
        null,
        this.errorConfig.value
      )
    });

    this.buildingForm = false;
  }

  onSubmit() {
    this._betStore.add(this.bet);

    this.bet = new BetModel();

    // There is no way to reset a form built with FormBuilder
    // https://github.com/angular/angular/issues/4933
    // So need to re-build form to reset everything
    this.buildForm();
  }
}
