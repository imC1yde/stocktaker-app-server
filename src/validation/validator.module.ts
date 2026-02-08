import { Global, Module } from '@nestjs/common';
import { DataValidatorProvider } from '@src/validation/data/data-validator.provider'
import { GameValidatorProvider } from '@src/validation/game/game-validator.provider'
import { UserValidatorProvider } from '@src/validation/user/user-validator.provider'

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
