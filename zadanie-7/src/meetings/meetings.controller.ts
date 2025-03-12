import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { BookMeetingDto } from './dto/book-meeting.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { MeetingEntity } from './entities/meeting.entity';

@ApiTags('meetings')
@Controller('meetings')
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Post()
  @ApiOperation({ summary: 'Utwórz nowe spotkanie' })
  @ApiResponse({
    status: 201,
    description: 'Spotkanie zostało pomyślnie utworzone.',
    type: MeetingEntity,
  })
  create(@Body() createMeetingDto: CreateMeetingDto) {
    return this.meetingsService.create(createMeetingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Pobierz wszystkie spotkania' })
  @ApiResponse({
    status: 200,
    description: 'Lista wszystkich spotkań.',
    type: [MeetingEntity],
  })
  findAll() {
    return this.meetingsService.findAll();
  }

  @Get('available')
  @ApiOperation({ summary: 'Pobierz dostępne terminy spotkań' })
  @ApiResponse({
    status: 200,
    description: 'Lista dostępnych terminów.',
    type: [MeetingEntity],
  })
  @ApiQuery({
    name: 'startDate',
    required: true,
    type: String,
    description: 'Data początkowa w formacie ISO',
  })
  @ApiQuery({
    name: 'endDate',
    required: true,
    type: String,
    description: 'Data końcowa w formacie ISO',
  })
  getAvailableTimeSlots(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    if (!startDate || !endDate) {
      throw new BadRequestException(
        'Należy podać parametry startDate i endDate',
      );
    }

    return this.meetingsService.getAvailableTimeSlots(startDate, endDate);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz spotkanie po ID' })
  @ApiResponse({
    status: 200,
    description: 'Dane spotkania.',
    type: MeetingEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Spotkanie nie zostało znalezione.',
  })
  findOne(@Param('id') id: string) {
    return this.meetingsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Aktualizuj dane spotkania' })
  @ApiResponse({
    status: 200,
    description: 'Dane spotkania zostały zaktualizowane.',
    type: MeetingEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Spotkanie nie zostało znalezione.',
  })
  update(@Param('id') id: string, @Body() updateMeetingDto: UpdateMeetingDto) {
    return this.meetingsService.update(+id, updateMeetingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Usuń spotkanie' })
  @ApiResponse({
    status: 200,
    description: 'Spotkanie zostało usunięte.',
    type: MeetingEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Spotkanie nie zostało znalezione.',
  })
  remove(@Param('id') id: string) {
    return this.meetingsService.remove(+id);
  }

  @Post(':id/book')
  @ApiOperation({ summary: 'Zarezerwuj spotkanie' })
  @ApiResponse({
    status: 200,
    description: 'Spotkanie zostało zarezerwowane.',
    type: MeetingEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Spotkanie jest już zarezerwowane.',
  })
  @ApiResponse({
    status: 404,
    description: 'Spotkanie nie zostało znalezione.',
  })
  bookMeeting(@Param('id') id: string, @Body() bookMeetingDto: BookMeetingDto) {
    return this.meetingsService.bookMeeting(+id, bookMeetingDto);
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Anuluj rezerwację spotkania' })
  @ApiResponse({
    status: 200,
    description: 'Rezerwacja spotkania została anulowana.',
    type: MeetingEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Spotkanie nie jest zarezerwowane.',
  })
  @ApiResponse({
    status: 404,
    description: 'Spotkanie nie zostało znalezione.',
  })
  cancelBooking(@Param('id') id: string) {
    return this.meetingsService.cancelBooking(+id);
  }
}
