import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSurveyDto } from './dto/create-survey.dto';

@Injectable()
export class SurveysService {
  constructor(private prisma: PrismaService) {}

  async create(createSurveyDto: CreateSurveyDto) {
    return this.prisma.$transaction(async (prisma) => {
      //Tworzenie ankiety
      const survey = await prisma.survey.create({
        data: {
          title: createSurveyDto.title,
          description: createSurveyDto.description,
        },
      });

      // Tworzenie pytań i opcji dla każdego pytania
      for (const questionDto of createSurveyDto.questions) {
        const question = await prisma.question.create({
          data: {
            surveyId: survey.id,
            content: questionDto.content,
            type: questionDto.type,
            order: questionDto.order,
          },
        });

        // Tworzenie opcji dla pytania (jeśli istnieją)
        if (questionDto.options && questionDto.options.length > 0) {
          for (const optionDto of questionDto.options) {
            await prisma.option.create({
              data: {
                questionId: question.id,
                content: optionDto.content,
                order: optionDto.order,
              },
            });
          }
        }
      }

      return this.findOne(survey.id);
    });
  }

  async findOne(id: number) {
    return this.prisma.survey.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            options: {
              orderBy: {
                order: 'asc',
              },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.survey.findMany({
      include: {
        questions: {
          include: {
            options: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
  }

  async getResults(id: number) {
    const survey = await this.prisma.survey.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            options: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
        responses: {
          include: {
            answers: {
              include: {
                question: true,
                option: true,
              },
            },
          },
        },
      },
    });

    if (!survey) {
      return null;
    }

    // Przygotowanie wyników
    const resultsData = survey.questions.map((question) => {
      // Dla pytań jednokrotnego i wielokrotnego wyboru liczymy odpowiedzi
      if (
        question.type === 'SINGLE_CHOICE' ||
        question.type === 'MULTIPLE_CHOICE'
      ) {
        const optionResults = question.options.map((option) => {
          const count = survey.responses.reduce((total, response) => {
            const hasAnswer = response.answers.some(
              (answer) =>
                answer.questionId === question.id &&
                answer.optionId === option.id,
            );
            return hasAnswer ? total + 1 : total;
          }, 0);

          return {
            optionId: option.id,
            content: option.content,
            count,
            percentage:
              survey.responses.length > 0
                ? Math.round((count / survey.responses.length) * 100)
                : 0,
          };
        });

        return {
          questionId: question.id,
          content: question.content,
          type: question.type,
          options: optionResults,
        };
      }
      // Dla pytań tekstowych zbieramy wszystkie odpowiedzi
      else if (question.type === 'TEXT') {
        const textAnswers = survey.responses.flatMap((response) =>
          response.answers
            .filter(
              (answer) => answer.questionId === question.id && answer.textValue,
            )
            .map((answer) => answer.textValue),
        );

        return {
          questionId: question.id,
          content: question.content,
          type: question.type,
          textAnswers,
        };
      }
    });

    return {
      id: survey.id,
      title: survey.title,
      description: survey.description,
      totalResponses: survey.responses.length,
      results: resultsData,
    };
  }
}
