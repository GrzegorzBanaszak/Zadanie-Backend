import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book as PrismaBook } from '@prisma/client';
import { UpdateBookDto } from './dto/update-book.dto';
import { FindBookDto } from './dto/find-book.dto';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Book, AvailabilityResponse } from './entities/book.entitie';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Dodaj nową książkę' })
  @ApiResponse({
    status: 201,
    description: 'Książka została dodana.',
    type: Book,
  })
  @ApiResponse({ status: 400, description: 'Nieprawidłowe dane.' })
  create(@Body() createBookDto: CreateBookDto): Promise<PrismaBook> {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Pobierz wszystkie książki' })
  @ApiResponse({
    status: 200,
    description: 'Lista wszystkich książek.',
    type: [Book],
  })
  findAll(): Promise<PrismaBook[]> {
    return this.booksService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Wyszukaj książki po tytule i/lub autorze' })
  @ApiResponse({
    status: 200,
    description: 'Lista pasujących książek.',
    type: [Book],
  })
  @ApiQuery({
    name: 'title',
    required: false,
    description: 'Wyszukiwanie po tytule',
  })
  @ApiQuery({
    name: 'author',
    required: false,
    description: 'Wyszukiwanie po autorze',
  })
  search(@Query() query: FindBookDto): Promise<PrismaBook[]> {
    return this.booksService.search(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz książkę po ID' })
  @ApiResponse({ status: 200, description: 'Znaleziono książkę.', type: Book })
  @ApiResponse({ status: 404, description: 'Książka nie została znaleziona.' })
  @ApiParam({ name: 'id', description: 'ID książki' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<PrismaBook> {
    return this.booksService.findOne(id);
  }

  @Get(':id/availability')
  @ApiOperation({ summary: 'Sprawdź dostępność książki' })
  @ApiResponse({
    status: 200,
    description: 'Informacja o dostępności książki.',
    type: AvailabilityResponse,
  })
  @ApiResponse({ status: 404, description: 'Książka nie została znaleziona.' })
  @ApiParam({ name: 'id', description: 'ID książki' })
  checkAvailability(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ available: boolean }> {
    return this.booksService.checkAvailability(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Zaktualizuj informacje o książce' })
  @ApiResponse({
    status: 200,
    description: 'Książka została zaktualizowana.',
    type: Book,
  })
  @ApiResponse({ status: 404, description: 'Książka nie została znaleziona.' })
  @ApiParam({ name: 'id', description: 'ID książki' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<PrismaBook> {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Usuń książkę' })
  @ApiResponse({
    status: 200,
    description: 'Książka została usunięta.',
    type: Book,
  })
  @ApiResponse({ status: 404, description: 'Książka nie została znaleziona.' })
  @ApiParam({ name: 'id', description: 'ID książki' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<PrismaBook> {
    return this.booksService.remove(id);
  }
}
