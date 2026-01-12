import { EMAIL_REGEX } from '@src/common/constants/regex.constants'

export class UserValidator {
  public static isEmail(email: string): boolean {
    return EMAIL_REGEX.test(email)
  }
}