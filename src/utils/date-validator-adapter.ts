import moment from 'moment'
import { DateValidator } from '../presentation/protocols/date-validator'

export class DateValidatorAdapter implements DateValidator {
  isValid (date: string): boolean {
    const validate = moment(date, 'YYYY-MM-DD', true).isValid()
    return validate
  }
}
