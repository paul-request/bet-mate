import moment from 'moment';

export class ValidationService {
  static dateValidator(control) {
    let date = moment(control.value);

    if (date.isValid()) return null;

    return { invalidDate: true };
  }

  static currencyValidator(control) {
    let isValid = !isNaN(parseFloat(control.value)) && isFinite(control.value);

    if (isValid) return null;

    return { invalidCurrency: true };
  }
}
