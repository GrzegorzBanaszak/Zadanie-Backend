import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
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
  password: string;
}
