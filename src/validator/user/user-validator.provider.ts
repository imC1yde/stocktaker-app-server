import { Injectable } from '@nestjs/common'
import { UserValidator } from '@src/validator/user/user.validator'

@Injectable()
export class UserValidatorProvider {
  public validateUserEmail(email: string): boolean {
    return UserValidator.isEmail(email)
  }
}