import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateResponseDto } from './dto/create-response.dto';

@Injectable()
export class ResponsesService {
  constructor(private prisma: PrismaService) {}

  async create(createResponseDto: CreateResponseDto) {
    // Sprawdzamy, czy ankieta istnieje
    const survey = await this.prisma.survey.findUnique({
      where: { id: createResponseDto.surveyId },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!survey) {
      throw new BadRequestException('Survey not found');
    }

    // Sprawdzamy, czy wszystkie pytania mają odpowiedzi
    const questionIds = survey.questions.map((q) => q.id);
    const answeredQuestionIds = createResponseDto.answers.map(
      (a) => a.questionId,
    );

    // Możemy także sprawdzić poprawność odpowiedzi (np. czy optionId istnieje dla danego pytania)
    for (const answer of createResponseDto.answers) {
      const question = survey.questions.find((q) => q.id === answer.questionId);

      if (!question) {
        throw new BadRequestException(
          `Question ${answer.questionId} not found in this survey`,
        );
      }

      // Sprawdzanie poprawności odpowiedzi w zależności od typu pytania
      if (
        (question.type === 'SINGLE_CHOICE' ||
          question.type === 'MULTIPLE_CHOICE') &&
        !answer.optionId
      ) {
        throw new BadRequestException(
          `Option ID is required for question ${answer.questionId}`,
        );
      }

      if (answer.optionId) {
        const optionExists = question.options.some(
          (o) => o.id === answer.optionId,
        );
        if (!optionExists) {
          throw new BadRequestException(
            `Option ${answer.optionId} not found in question ${answer.questionId}`,
          );
        }
      }

      if (question.type === 'TEXT' && !answer.textValue) {
        throw new BadRequestException(
          `Text value is required for question ${answer.questionId}`,
        );
      }
    }

    // Tworzymy odpowiedź w transakcji
    return this.prisma.$transaction(async (prisma) => {
      const response = await prisma.response.create({
        data: {
          surveyId: createResponseDto.surveyId,
        },
      });

      // Tworzymy odpowiedzi na pytania
      for (const answerDto of createResponseDto.answers) {
        await prisma.answer.create({
          data: {
            responseId: response.id,
            questionId: answerDto.questionId,
            optionId: answerDto.optionId,
            textValue: answerDto.textValue,
          },
        });
      }

      // Zwracamy utworzoną odpowiedź z odpowiedziami na pytania
      return prisma.response.findUnique({
        where: { id: response.id },
        include: {
          answers: {
            include: {
              question: true,
              option: true,
            },
          },
        },
      });
    });
  }

  async findAll() {
    return this.prisma.response.findMany({
      include: {
        survey: true,
        answers: {
          include: {
            question: true,
            option: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.response.findUnique({
      where: { id },
      include: {
        survey: true,
        answers: {
          include: {
            question: true,
            option: true,
          },
        },
      },
    });
  }
}
