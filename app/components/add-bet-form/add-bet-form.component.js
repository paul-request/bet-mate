import { Component } from '@angular/core';

import { BetStoreService } from '../../services/bet-store.service';
import template from './add-bet-form.template.html';
import { BetModel } from  '../../models/bet.model';
import { BET_TYPES, BET_EVENTS, BOOKMAKERS, EXCHANGES } from  '../../constants/constants';

@Component({
  selector: 'add-bet-form',
  template: template
})
export class AddBetFormComponent {
  bet;
  type;
  events;
  bookmakers;
  exchanges;

  constructor(betStore: BetStoreService) {
    this.types = BET_TYPES;
    this.events = BET_EVENTS;
    this.bookmakers = BOOKMAKERS;
    this.exchanges = EXCHANGES;

    this._betStore = betStore;

    this.bet = new BetModel();
  }

  new() {
    this._betStore.add(this.bet);
  }
}
