import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { LeadsModule } from './leads/leads.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [PrismaModule, LeadsModule, AuthModule],
})
export class AppModule {}
