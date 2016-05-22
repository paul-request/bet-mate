import * as uuid from 'node-uuid';

export class BetModel {
  completed;
  uid;
  bookmaker;
  exchange;
  date;
  type;
  event;
  value;

  constructor(...options) {
    this.uid = options.uid || uuid.v4();

    this.bookmaker = options.bookmaker || null;
    this.exchange = options.exchange || null;
    this.date = options.date || new Date();
    this.type = options.type || null;
    this.event = options.event || null;
    this.value = options.value || '0.00';
    this.completed = options.completed || false;
  }

  get data() {
    return {
      uid: this.uid,
      bookmaker: this.bookmaker,
      exchange: this.exchange,
      date: this.date,
      type: this.type,
      event: this.event,
      value: this.value,
      completed: this.completed
    };
  }
}
