import { Injectable } from '@nestjs/common'
import { UserValidator } from '@src/validation/user/user.validator'

@Injectable()
export class UserValidatorProvider {
  public validateUserEmail(email: string): boolean {
    return UserValidator.isEmail(email)
  }
}