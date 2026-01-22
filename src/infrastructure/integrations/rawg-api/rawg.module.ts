import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { RawgClient } from '@src/infrastructure/integrations/rawg-api/rawg.client'

@Module({
  providers: [
    RawgClient
  ],
  imports: [
    HttpModule
  ],
  exports: [
    RawgClient
  ]
})
export class RawgModule {}