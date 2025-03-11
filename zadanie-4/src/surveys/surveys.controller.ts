import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Ankiety')
@Controller('surveys')
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  @Post()
  @ApiOperation({ summary: 'Tworzenie nowej ankiety' })
  @ApiResponse({
    status: 201,
    description: 'Ankieta została pomyślnie utworzona',
  })
  @ApiResponse({
    status: 400,
    description: 'Nieprawidłowe dane wejściowe',
  })
  create(@Body() createSurveyDto: CreateSurveyDto) {
    return this.surveysService.create(createSurveyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Pobieranie wszystkich ankiet' })
  @ApiResponse({
    status: 200,
    description: 'Lista wszystkich ankiet',
  })
  findAll() {
    return this.surveysService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobieranie konkretnej ankiety' })
  @ApiParam({ name: 'id', description: 'ID ankiety' })
  @ApiResponse({
    status: 200,
    description: 'Szczegóły ankiety',
  })
  @ApiResponse({
    status: 404,
    description: 'Ankieta nie została znaleziona',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.surveysService.findOne(id);
  }

  @Get(':id/results')
  @ApiOperation({ summary: 'Pobieranie wyników ankiety' })
  @ApiParam({ name: 'id', description: 'ID ankiety' })
  @ApiResponse({
    status: 200,
    description: 'Wyniki ankiety ze statystykami',
  })
  @ApiResponse({
    status: 404,
    description: 'Ankieta nie została znaleziona',
  })
  getResults(@Param('id', ParseIntPipe) id: number) {
    return this.surveysService.getResults(id);
  }
}
