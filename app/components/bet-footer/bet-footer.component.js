import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, RouteParams } from '@angular/router-deprecated';

import { BetStoreService } from '../../services/bet-store.service';
import template from './bet-footer.template.html';

@Component({
  selector: 'bet-footer',
  template: template,
  directives: [ROUTER_DIRECTIVES]
})
export class BetFooterComponent {
  static get parameters() {
    return [[BetStoreService], [RouteParams]];
  }

  constructor(betStore, params) {
    this._betStore = betStore;
    this._params = params;
  }

  removeCompleted() {
    this._betStore.removeCompleted();
  }

  getCount() {
    return this._betStore.bets.length;
  }

  getOpenCount() {
    return this._betStore.getOpen().length;
  }

  hasCompleted() {
    return this._betStore.getCompleted().length > 0;
  }

  getStatus() {
    return this._params.get('status');
  }
}
