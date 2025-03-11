import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsISBN,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    description: 'Tytuł książki',
    example: 'Wiedźmin: Ostatnie życzenie',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Autor książki',
    example: 'Andrzej Sapkowski',
  })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    description: 'Numer ISBN książki',
    example: '9788375780635',
  })
  @IsString()
  @IsISBN()
  @IsNotEmpty()
  isbn: string;

  @ApiPropertyOptional({
    description: 'Opis książki',
    example: 'Geralt z Rivii, wiedźmin, przemierza krainę walcząc z potworami.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Czy książka jest dostępna',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  available?: boolean = true;
}
