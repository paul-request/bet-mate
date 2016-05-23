import { Component } from '@angular/core';
import { ControlGroup, FormBuilder, Validators } from '@angular/common';

import { ValidationService } from '../../services/validation.service';
import { BetStoreService } from '../../services/bet-store.service';
import template from './add-bet-form.template.html';
import { BetModel } from  '../../models/bet.model';
import { BET_TYPES, BET_EVENTS, BOOKMAKERS, EXCHANGES } from  '../../constants/constants';

@Component({
  selector: 'add-bet-form',
  template: template
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

    this.formControlGroup = this._formBuilder.group({
      bookmaker: [this.bet.bookmaker, Validators.required],
      exchange: [this.bet.exchange, Validators.required],
      eventDate: [this.bet.eventDate, Validators.compose([Validators.required, ValidationService.dateValidator])],
      type: [this.bet.type, Validators.required],
      event: [this.bet.event, Validators.required],
      value: [this.bet.value, Validators.compose([Validators.required, ValidationService.currencyValidator])],
    });
  }

  onSubmit() {
    console.log('ADD', this.bet)
    this._betStore.add(this.bet);

    this.bet = new BetModel();
  }
}
