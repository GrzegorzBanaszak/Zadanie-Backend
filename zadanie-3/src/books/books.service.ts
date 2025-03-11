import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from '@prisma/client';
import { FindBookDto } from './dto/find-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    return await this.prisma.book.create({ data: createBookDto });
  }

  async findAll(): Promise<Book[]> {
    return await this.prisma.book.findMany();
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.prisma.book.findUnique({ where: { id } });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    try {
      return await this.prisma.book.update({
        where: { id },
        data: updateBookDto,
      });
    } catch (error) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  }

  async remove(id: number): Promise<Book> {
    try {
      return await this.prisma.book.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  }

  async search(params: FindBookDto): Promise<Book[]> {
    const { title, author } = params;

    const where = {};

    if (title) {
      where['title'] = {
        contains: title,
      };
    }

    if (author) {
      where['author'] = {
        contains: author,
      };
    }

    return await this.prisma.book.findMany({ where });
  }

  async checkAvailability(id: number): Promise<{ available: boolean }> {
    const book = await this.findOne(id);
    return { available: book.available };
  }
}
