import { Global, Module } from '@nestjs/common';
import { DataValidatorProvider } from '@src/validator/data/data-validator.provider'
import { GameValidatorProvider } from '@src/validator/game/game-validator.provider'
import { UserValidatorProvider } from '@src/validator/user/user-validator.provider'

@Global()
@Module({
  exports: [
    UserValidatorProvider,
    DataValidatorProvider,
    GameValidatorProvider
  ],
  providers: [
    UserValidatorProvider,
    DataValidatorProvider,
    GameValidatorProvider
  ]
})
export class ValidatorModule {}
