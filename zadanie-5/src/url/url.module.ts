import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UrlController],
  providers: [UrlService],
  imports: [PrismaModule],
})
export class UrlModule {}
