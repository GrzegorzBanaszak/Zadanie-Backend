import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindBookDto {
  @ApiPropertyOptional({
    description: 'Wyszukiwanie po tytule (część tytułu)',
    example: 'Wiedźmin',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Wyszukiwanie po autorze (część nazwiska)',
    example: 'Sapkowski',
  })
  @IsString()
  @IsOptional()
  author?: string;
}
