import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsISBN, IsOptional, IsString } from 'class-validator';

export class UpdateBookDto {
  @ApiPropertyOptional({
    description: 'Tytuł książki',
    example: 'Wiedźmin: Miecz przeznaczenia',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Autor książki',
    example: 'Andrzej Sapkowski',
  })
  @IsString()
  @IsOptional()
  author?: string;

  @ApiPropertyOptional({
    description: 'Numer ISBN książki',
    example: '9788375780642',
  })
  @IsString()
  @IsOptional()
  @IsISBN()
  isbn?: string;

  @ApiPropertyOptional({
    description: 'Opis książki',
    example: 'Druga część przygód Geralta z Rivii.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Czy książka jest dostępna',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  available?: boolean;
}
