import { ApiProperty } from '@nestjs/swagger';

export class OptionDto {
  @ApiProperty({
    description: 'Treść opcji odpowiedzi',
    example: 'Tak',
  })
  content: string;

  @ApiProperty({
    description: 'Kolejność wyświetlania opcji',
    example: 1,
  })
  order: number;
}

export class QuestionDto {
  @ApiProperty({
    description: 'Treść pytania',
    example: 'Czy lubisz programować?',
  })
  content: string;

  @ApiProperty({
    description: 'Typ pytania',
    enum: ['SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'TEXT'],
    example: 'SINGLE_CHOICE',
  })
  type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TEXT';

  @ApiProperty({
    description: 'Kolejność wyświetlania pytania',
    example: 1,
  })
  order: number;

  @ApiProperty({
    description: 'Lista dostępnych opcji odpowiedzi',
    type: [OptionDto],
  })
  options: OptionDto[];
}

export class CreateSurveyDto {
  @ApiProperty({
    description: 'Tytuł ankiety',
    example: 'Badanie satysfakcji klientów',
  })
  title: string;

  @ApiProperty({
    description: 'Opis ankiety',
    required: false,
    example: 'Ankieta badająca poziom zadowolenia klientów z naszych usług',
  })
  description?: string;

  @ApiProperty({
    description: 'Lista pytań w ankiecie',
    type: [QuestionDto],
  })
  questions: QuestionDto[];
}
