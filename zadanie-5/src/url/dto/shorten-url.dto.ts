import { IsUrl, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ShortenUrlDto {
  @ApiProperty({
    description: 'Oryginalny długi URL do skrócenia',
    example: 'https://www.example.com/bardzo/długi/adres/url',
  })
  @IsUrl()
  @IsNotEmpty()
  longUrl: string;
}
