import { Module } from '@nestjs/common';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SurveysController],
  providers: [SurveysService],
  imports: [PrismaModule],
})
export class SurveysModule {}
