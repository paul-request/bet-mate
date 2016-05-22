import localStorage from 'localStorage';
import { BetModel } from '../models/bet.model';
import { BET_STORE_KEYS } from '../constants/constants';

export class BetStoreService {
  bets = [];

  constructor() {
    let persistedBets = JSON.parse(localStorage.getItem(BET_STORE_KEYS.BETS)) || [];

    this.bets = persistedBets.map(bet => {
      const {
        uid, bookmaker, exchange, date, type, event, value, completed
      } = bet;

      return new BetModel(uid, bookmaker, exchange, date, type, event, value, completed);
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

  getOpen() {
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

  add(model) {
    this.bets.push(model.data);
    this.persist();
  }

  persist() {
    this._clearCache();
    localStorage.setItem(BET_STORE_KEYS.BETS, JSON.stringify(this.bets));
  }

  _findByUid(uid) {
    return this.bets.find(bet => bet.uid === uid);
  }

  _clearCache() {
    this.completedBets = null;
    this.openBets = null;
  }
}
