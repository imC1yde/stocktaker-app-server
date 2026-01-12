import { Global, Module } from '@nestjs/common';
import { DataValidatorProvider } from '@src/validator/data/data-validator.provider'
import { UserValidatorProvider } from '@src/validator/user/user-validator.provider'

@Global()
@Module({
  exports: [
    UserValidatorProvider,
    DataValidatorProvider ],
  providers: [
    UserValidatorProvider,
    DataValidatorProvider ]
})
export class ValidatorModule {}
