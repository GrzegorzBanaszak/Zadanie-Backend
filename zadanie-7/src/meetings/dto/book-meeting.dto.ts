import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class BookMeetingDto {
  @ApiProperty({ description: 'ID użytkownika rezerwującego spotkanie' })
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
