import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMeetingDto {
  @ApiProperty({ description: 'Tytuł spotkania' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Opis spotkania', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Czas rozpoczęcia spotkania',
    example: '2025-03-15T10:00:00Z',
  })
  @IsDateString()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({
    description: 'Czas zakończenia spotkania',
    example: '2025-03-15T11:00:00Z',
  })
  @IsDateString()
  @IsNotEmpty()
  endTime: string;
}
