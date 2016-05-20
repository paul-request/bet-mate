import { Component } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { BetStoreService } from '../../services/bet-store.service';
import template from './bet-list.template.html';
import { AddBetFormComponent } from '../add-bet-form/add-bet-form.component';
import { BetFooterComponent } from '../bet-footer/bet-footer.component';
import { BetItemComponent } from '../bet-item/bet-item.component';

@Component({
  selector: 'bet-list',
  template: template,
  directives: [AddBetFormComponent, BetFooterComponent, BetItemComponent]
})
export class BetComponent {
  constructor(betStore: BetStoreService, params: RouteParams) {
    this._betStore = betStore;
    this._params = params;
  }

  remove(uid) {
    this._betStore.remove(uid);
  }

  update() {
    this._betStore.persist();
  }

  getBets() {
    let currentStatus = this._params.get('status');
    if (currentStatus == 'completed') {
      return this._betStore.getCompleted();
    }
    else if (currentStatus == 'active') {
      return this._betStore.getRemaining();
    }
    else {
      return this._betStore.bets;
    }
  }

  allCompleted() {
    return this._betStore.allCompleted();
  }

  setAllTo(toggleAll) {
    this._betStore.setAllTo(toggleAll.checked);
  }
}
