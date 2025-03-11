import { Module } from '@nestjs/common';
import { ResponsesController } from './responses.controller';
import { ResponsesService } from './responses.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ResponsesController],
  providers: [ResponsesService],
  imports: [PrismaModule],
})
export class ResponsesModule {}
