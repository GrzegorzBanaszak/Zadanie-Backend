import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SurveysModule } from './surveys/surveys.module';
import { ResponsesModule } from './responses/responses.module';

@Module({
  imports: [PrismaModule, SurveysModule, ResponsesModule],
})
export class AppModule {}
