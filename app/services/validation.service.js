import moment from 'moment';
import { MOMENT_DATE_FORMAT } from '../constants/constants';

export class ValidationService {
  static dateValidator(control) {
    if (moment(control.value, MOMENT_DATE_FORMAT, true).isValid()) return null;

    return { invalidDate: true };
  }

  static currencyValidator(control) {
    const isValid = !isNaN(parseFloat(control.value)) && isFinite(control.value);

    if (isValid) return null;

    return { invalidCurrency: true };
  }
}
