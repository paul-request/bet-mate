import * as uuid from 'node-uuid';

export class BetModel {
  constructor(...options) {
    const defaults = {
      uid: uuid.v4(),
      bookmaker: null,
      exchange: null,
      eventDate: null,
      type: null,
      event: null,
      value: null,
      completed: false
    };

    Object.assign(this, defaults, options);
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
      completed: this.completed
    };
  }
}
