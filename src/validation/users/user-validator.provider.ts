import { Injectable } from '@nestjs/common'
import { UserValidator } from '@src/validation/users/user.validator'

@Injectable()
export class UserValidatorProvider {
  public validateUserEmail(email: string): boolean {
    return UserValidator.isEmail(email)
  }
}