import { ApiProperty } from '@nestjs/swagger';

export class AnswerDto {
  @ApiProperty({
    description: 'ID pytania, na które udzielana jest odpowiedź',
    example: 1,
  })
  questionId: number;

  @ApiProperty({
    description:
      'ID wybranej opcji (dla pytań jednokrotnego lub wielokrotnego wyboru)',
    required: false,
    example: 2,
  })
  optionId?: number;

  @ApiProperty({
    description: 'Treść odpowiedzi (dla pytań tekstowych)',
    required: false,
    example: 'Moim zdaniem usługi są na wysokim poziomie.',
  })
  textValue?: string;
}

export class CreateResponseDto {
  @ApiProperty({
    description: 'ID ankiety, na którą udzielana jest odpowiedź',
    example: 1,
  })
  surveyId: number;

  @ApiProperty({
    description: 'Lista odpowiedzi na pytania ankiety',
    type: [AnswerDto],
  })
  answers: AnswerDto[];
}
