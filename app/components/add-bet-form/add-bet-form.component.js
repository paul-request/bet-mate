import { Component } from '@angular/core';

import { BetStoreService } from '../../services/bet-store.service';
import template from './add-bet-form.template.html';

@Component({
  selector: 'add-bet-form',
  template: template
})
export class AddBetFormComponent {
  newBet = '';

  constructor(betStore: BetStoreService) {
    this._betStore = betStore;
  }

  addBet() {
    if (this.newBet.trim().length) {
      this._betStore.add(this.newBet);
      this.newBet = '';
    }
  }
}
