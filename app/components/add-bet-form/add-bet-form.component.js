import { Component } from '@angular/core';
import { ControlGroup, FormBuilder, Validators } from '@angular/common';

import { ValidationService } from '../../services/validation.service';
import { BetStoreService } from '../../services/bet-store.service';
import template from './add-bet-form.template.html';
import { BetModel } from  '../../models/bet.model';
//import { ControlMessages } from '../common/control-messages.component';
import { BET_TYPES, BET_EVENTS, BOOKMAKERS, EXCHANGES } from  '../../constants/constants';

@Component({
  selector: 'add-bet-form',
  template: template,
  //directives: [ControlMessages]
})
export class AddBetFormComponent {
  constructor(betStore: BetStoreService, formBuilder: FormBuilder) {
    this.types = BET_TYPES;
    this.events = BET_EVENTS;
    this.bookmakers = BOOKMAKERS;
    this.exchanges = EXCHANGES;

    this._betStore = betStore;
    this._formBuilder = formBuilder;

    this.bet = new BetModel();

    this.buildForm();
  }

  buildForm() {
    this.formControlGroup = this._formBuilder.group({
      bookmaker: [this.bet.bookmaker, Validators.required],
      exchange: [this.bet.exchange, Validators.required],
      eventDate: [this.bet.eventDate, Validators.compose([
        Validators.required, ValidationService.dateValidator
      ])],
      type: [this.bet.type, Validators.required],
      event: [this.bet.event, Validators.required],
      value: [this.bet.value, Validators.compose([
        Validators.required, ValidationService.currencyValidator
      ])],
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
