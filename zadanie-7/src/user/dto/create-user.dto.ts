import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Adres email użytkownika',
    example: 'grzegorz@mail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Imię i nazwisko użytkownika',
    example: 'Grzegorz',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
