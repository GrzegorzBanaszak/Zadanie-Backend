import { Meeting } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class MeetingEntity implements Meeting {
  @ApiProperty({ description: 'Unikalny identyfikator spotkania' })
  id: number;

  @ApiProperty({ description: 'Tytuł spotkania' })
  title: string;

  @ApiProperty({
    description: 'Opis spotkania',
    required: false,
    nullable: true,
  })
  description: string | null;

  @ApiProperty({ description: 'Czas rozpoczęcia spotkania' })
  startTime: Date;

  @ApiProperty({ description: 'Czas zakończenia spotkania' })
  endTime: Date;

  @ApiProperty({
    description: 'ID użytkownika rezerwującego spotkanie',
    required: false,
    nullable: true,
  })
  userId: number | null;

  @ApiProperty({ description: 'Data utworzenia spotkania' })
  createdAt: Date;

  @ApiProperty({ description: 'Data ostatniej aktualizacji spotkania' })
  updatedAt: Date;
}
