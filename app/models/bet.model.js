import * as uuid from 'node-uuid';

export class BetModel {
  constructor(betStore, ...options) {
    const defaults = {
      uid: uuid.v4(),
      bookmaker: null,
      exchange: null,
      eventDate: null,
      type: null,
      event: null,
      value: null,
      outcome: null,
      completed: false
    };

    Object.assign(this, defaults, options);

    this._betStore = betStore;
  }

  get data() {
    return {
      uid: this.uid,
      bookmaker: this.bookmaker,
      exchange: this.exchange,
      eventDate: this.eventDate,
      type: this.type,
      event: this.event,
      value: this.value,
      outcome: this.outcome,
      completed: this.completed
    };
  }
}
