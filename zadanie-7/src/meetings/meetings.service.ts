import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { UserService } from '../user/user.service';
import { BookMeetingDto } from './dto/book-meeting.dto';

@Injectable()
export class MeetingsService {
  constructor(
    private prisma: PrismaService,
    private usersService: UserService,
  ) {}

  async create(createMeetingDto: CreateMeetingDto) {
    const { startTime, endTime } = createMeetingDto;

    // Sprawdzenie czy czas rozpoczęcia jest przed czasem zakończenia
    if (new Date(startTime) >= new Date(endTime)) {
      throw new BadRequestException(
        'Czas rozpoczęcia musi być przed czasem zakończenia',
      );
    }

    return this.prisma.meeting.create({
      data: {
        ...createMeetingDto,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
    });
  }

  async findAll() {
    return this.prisma.meeting.findMany({
      include: {
        user: true,
      },
    });
  }

  async findOne(id: number) {
    const meeting = await this.prisma.meeting.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!meeting) {
      throw new NotFoundException(
        `Spotkanie z ID ${id} nie zostało znalezione`,
      );
    }

    return meeting;
  }

  async update(id: number, updateMeetingDto: UpdateMeetingDto) {
    // Sprawdzenie czy spotkanie istnieje
    await this.findOne(id);

    const data: any = { ...updateMeetingDto };

    // Konwersja dat z string na Date jeśli zostały podane
    if (updateMeetingDto.startTime) {
      data.startTime = new Date(updateMeetingDto.startTime);
    }

    if (updateMeetingDto.endTime) {
      data.endTime = new Date(updateMeetingDto.endTime);
    }

    // Sprawdzenie czy czas rozpoczęcia jest przed czasem zakończenia (jeśli oba zostały zaktualizowane)
    if (data.startTime && data.endTime && data.startTime >= data.endTime) {
      throw new BadRequestException(
        'Czas rozpoczęcia musi być przed czasem zakończenia',
      );
    }

    return this.prisma.meeting.update({
      where: { id },
      data,
      include: {
        user: true,
      },
    });
  }

  async remove(id: number) {
    // Sprawdzenie czy spotkanie istnieje
    await this.findOne(id);

    return this.prisma.meeting.delete({
      where: { id },
    });
  }

  async bookMeeting(id: number, bookMeetingDto: BookMeetingDto) {
    // Sprawdzenie czy użytkownik istnieje
    await this.usersService.findOne(bookMeetingDto.userId);

    // Sprawdzenie czy spotkanie istnieje
    const meeting = await this.findOne(id);

    // Sprawdzenie czy spotkanie jest już zarezerwowane
    if (meeting.userId) {
      throw new BadRequestException('Spotkanie jest już zarezerwowane');
    }

    return this.prisma.meeting.update({
      where: { id },
      data: {
        userId: bookMeetingDto.userId,
      },
      include: {
        user: true,
      },
    });
  }

  async cancelBooking(id: number) {
    // Sprawdzenie czy spotkanie istnieje
    const meeting = await this.findOne(id);

    // Sprawdzenie czy spotkanie jest zarezerwowane
    if (!meeting.userId) {
      throw new BadRequestException('Spotkanie nie jest zarezerwowane');
    }

    return this.prisma.meeting.update({
      where: { id },
      data: {
        userId: null,
      },
    });
  }

  async getAvailableTimeSlots(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Sprawdzenie poprawności zakresu dat
    if (start >= end) {
      throw new BadRequestException(
        'Data początkowa musi być przed datą końcową',
      );
    }

    // Pobranie wszystkich spotkań w danym zakresie dat
    const meetings = await this.prisma.meeting.findMany({
      where: {
        OR: [
          {
            startTime: {
              gte: start,
              lt: end,
            },
          },
          {
            endTime: {
              gt: start,
              lte: end,
            },
          },
        ],
      },
      orderBy: {
        startTime: 'asc',
      },
    });

    // Filtrowanie tylko dostępnych spotkań (bez przypisanego użytkownika)
    return meetings.filter((meeting) => meeting.userId === null);
  }
}
