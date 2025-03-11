import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Odpowiedzi')
@Controller('responses')
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}

  @Post()
  @ApiOperation({ summary: 'Dodawanie odpowiedzi na ankietę' })
  @ApiResponse({
    status: 201,
    description: 'Odpowiedź została pomyślnie zapisana',
  })
  @ApiResponse({
    status: 400,
    description: 'Nieprawidłowe dane wejściowe lub brak ankiety o podanym ID',
  })
  create(@Body() createResponseDto: CreateResponseDto) {
    return this.responsesService.create(createResponseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Pobieranie wszystkich odpowiedzi' })
  @ApiResponse({
    status: 200,
    description: 'Lista wszystkich odpowiedzi',
  })
  findAll() {
    return this.responsesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobieranie konkretnej odpowiedzi' })
  @ApiParam({ name: 'id', description: 'ID odpowiedzi' })
  @ApiResponse({
    status: 200,
    description: 'Szczegóły odpowiedzi',
  })
  @ApiResponse({
    status: 404,
    description: 'Odpowiedź nie została znaleziona',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.responsesService.findOne(id);
  }
}
