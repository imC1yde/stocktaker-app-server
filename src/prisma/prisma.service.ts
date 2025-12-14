import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {

    async onModuleInit(): Promise<this> {
        return this.$connect()
    }

    async onModuleDestroy(): Promise<this> {
        return this.$disconnect()
    }
}
