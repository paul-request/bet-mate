import localStorage from 'localStorage';

import { BetModel } from '../models/bet.model';

export class BetStoreService {
  bets = [];

  constructor() {
    let persistedBets = JSON.parse(localStorage.getItem('bet-mate-bets')) || [];

    this.bets = persistedBets.map(bet => {
      let ret = new BetModel(bet.title);
      ret.completed = bet.completed;
      ret.uid = bet.uid;
      return ret;
    });
  }

  get(state) {
    return this.bets.filter(bet => bet.completed === state.completed);
  }

  allCompleted() {
    return this.bets.length === this.getCompleted().length;
  }

  setAllTo(completed) {
    this.bets.forEach(bet => bet.completed = completed);
    this.persist();
  }

  removeCompleted() {
    this.bets = this.get({ completed: false });
    this.persist();
  }

  getRemaining() {
    if (!this.openBets) {
      this.openBets = this.get({ completed: false });
    }

    return this.openBets;
  }

  getCompleted() {
    if (!this.completedBets) {
      this.completedBets = this.get({ completed: true });
    }

    return this.completedBets;
  }

  toggleCompletion(uid) {
    let bet = this._findByUid(uid);

    if (bet) {
      bet.completed = !bet.completed;
      this.persist();
    }
  }

  remove(uid) {
    let bet = this._findByUid(uid);

    if (bet) {
      this.bets.splice(this.bets.indexOf(bet), 1);
      this.persist();
    }
  }

  add(title) {
    this.bets.push(new BetModel(title));
    this.persist();
  }

  persist() {
    this._clearCache();
    localStorage.setItem('bet-mate-bets', JSON.stringify(this.bets));
  }

  _findByUid(uid) {
    return this.bets.find(bet => bet.uid === uid);
  }

  _clearCache() {
    this.completedBets = null;
    this.openBets = null;
  }
}
