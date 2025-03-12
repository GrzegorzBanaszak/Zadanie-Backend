import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { MeetingsModule } from './meetings/meetings.module';

@Module({
  imports: [PrismaModule, UserModule, MeetingsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
