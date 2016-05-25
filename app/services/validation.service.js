import moment from 'moment';

export class ValidationService {
  static dateValidator(control) {
    let date = moment(control.value);

    if (date.isValid()) return null;

    return { invalidDate: true };
  }

  static currencyValidator(control) {
    return null;
  }
}
