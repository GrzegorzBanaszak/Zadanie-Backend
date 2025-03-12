import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements User {
  @ApiProperty({ description: 'Unikalny identyfikator użytkownika' })
  id: number;

  @ApiProperty({ description: 'Adres email użytkownika' })
  email: string;

  @ApiProperty({ description: 'Imię i nazwisko użytkownika' })
  name: string;

  @ApiProperty({ description: 'Data utworzenia konta' })
  createdAt: Date;

  @ApiProperty({ description: 'Data ostatniej aktualizacji konta' })
  updatedAt: Date;
}
