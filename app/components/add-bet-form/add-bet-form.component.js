import { Component } from '@angular/core';
import { ControlGroup, Control, Validators } from '@angular/common';

import { ValidationService } from '../../services/validation.service';
import { BetStoreService } from '../../services/bet-store.service';
import { CustomControl } from '../../services/custom-control.service';
import template from './add-bet-form.template.html';
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

    this.buildForm();
  }

  get errorConfig() {
    return {
      eventDate: {
        required: 'Event date is required',
        invalidDate: 'Invalid event date in the format dd/mm/yyyy'
      }
    }
  }

  buildForm() {
    // this.formControlGroup = this._formBuilder.group({
    //   bookmaker: [this.bet.bookmaker, Validators.required],
    //   exchange: [this.bet.exchange, Validators.required],
    //   eventDate: [this.bet.eventDate, Validators.compose([
    //     Validators.required, ValidationService.dateValidator
    //   ])],
    //   type: [this.bet.type, Validators.required],
    //   event: [this.bet.event, Validators.required],
    //   value: [this.bet.value, Validators.compose([
    //     Validators.required, ValidationService.currencyValidator
    //   ])],
    // });

    // TODO: create a new Class that extends Control and
    // accepts an optional message object, then the validation
    // message can be extracted from the control?
    this.formControlGroup = new ControlGroup({
      bookmaker: new Control(this.bet.bookmaker, Validators.required),
      exchange: new Control(this.bet.exchange, Validators.required),
      eventDate: new CustomControl(this.bet.eventDate, Validators.compose([
        Validators.required, ValidationService.dateValidator
      ]), null, this.errorConfig.eventDate),
      type: new Control(this.bet.type, Validators.required),
      event: new Control(this.bet.event, Validators.required),
      value: new Control(this.bet.value, Validators.compose([
        Validators.required, ValidationService.currencyValidator
      ])),
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
