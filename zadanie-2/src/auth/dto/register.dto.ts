import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'Status zadania',
    example: 'grzegorz@mail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Hasło',
    example: 'supertajne123',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
