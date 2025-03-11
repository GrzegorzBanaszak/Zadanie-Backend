import { ApiProperty } from '@nestjs/swagger';

export class UrlMappingDto {
  @ApiProperty({
    description: 'Unikalny identyfikator wpisu w bazie danych',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Wygenerowany krótki identyfikator',
    example: 'Abc12345',
  })
  shortId: string;

  @ApiProperty({
    description: 'Oryginalny długi URL',
    example: 'https://www.example.com/bardzo/długi/adres/url',
  })
  longUrl: string;

  @ApiProperty({
    description: 'Pełny skrócony URL do użycia',
    example: 'http://localhost:3000/Abc12345',
  })
  shortUrl: string;

  @ApiProperty({
    description: 'Liczba odwiedzin/przekierowań',
    example: 42,
  })
  visits: number;

  @ApiProperty({
    description: 'Data utworzenia wpisu',
    example: '2023-01-01T12:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data ostatniej aktualizacji wpisu',
    example: '2023-01-01T12:00:00.000Z',
  })
  updatedAt: Date;
}
