import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { RawgService } from '@src/catalog/game-catalog/rawg/rawg.service'

@Module({
  providers: [
    RawgService
  ],
  imports: [ HttpModule ]
})
export class RawgModule {}