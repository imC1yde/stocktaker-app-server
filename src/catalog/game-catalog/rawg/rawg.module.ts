import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { RawgResolver } from '@src/catalog/game-catalog/rawg/rawg.resolver'
import { RawgService } from '@src/catalog/game-catalog/rawg/rawg.service'

@Module({
  providers: [
    RawgService,
    RawgResolver
  ],
  imports: [ HttpModule ]
})
export class RawgModule {}