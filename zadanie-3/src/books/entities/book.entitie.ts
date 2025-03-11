import { ApiProperty } from '@nestjs/swagger';

export class Book {
  @ApiProperty({
    description: 'Unikalny identyfikator książki',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Tytuł książki',
    example: 'Wiedźmin: Ostatnie życzenie',
  })
  title: string;

  @ApiProperty({
    description: 'Autor książki',
    example: 'Andrzej Sapkowski',
  })
  author: string;

  @ApiProperty({
    description: 'Numer ISBN książki',
    example: '9788375780635',
  })
  isbn: string;

  @ApiProperty({
    description: 'Opis książki',
    example: 'Geralt z Rivii, wiedźmin, przemierza krainę walcząc z potworami.',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    description: 'Czy książka jest dostępna',
    example: true,
  })
  available: boolean;

  @ApiProperty({
    description: 'Data utworzenia rekordu',
    example: '2025-03-11T12:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data ostatniej aktualizacji rekordu',
    example: '2025-03-11T12:00:00Z',
  })
  updatedAt: Date;
}

export class AvailabilityResponse {
  @ApiProperty({
    description: 'Informacja o dostępności książki',
    example: true,
  })
  available: boolean;
}
