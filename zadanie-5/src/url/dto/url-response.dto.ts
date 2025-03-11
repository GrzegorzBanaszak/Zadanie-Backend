import { ApiProperty } from '@nestjs/swagger';

export class UrlResponseDto {
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
}
