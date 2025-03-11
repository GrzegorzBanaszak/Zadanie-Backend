import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as shortid from 'shortid';
import { UrlResponseDto } from './dto/url-response.dto';
import { UrlMappingDto } from './dto/url-mapping.dto';

@Injectable()
export class UrlService {
  constructor(private prisma: PrismaService) {}

  async shortenUrl(longUrl: string): Promise<UrlResponseDto> {
    // Sprawdzamy, czy URL już istnieje
    const existingUrl = await this.prisma.urlMapping.findFirst({
      where: { longUrl },
    });

    if (existingUrl) {
      return {
        shortId: existingUrl.shortId,
        longUrl: existingUrl.longUrl,
        shortUrl: `http://localhost:3000/${existingUrl.shortId}`,
      };
    }

    // Generujemy unikalny, krótki identyfikator
    const shortId = shortid.generate();

    // Zapisujemy nowy wpis w bazie danych
    const newUrl = await this.prisma.urlMapping.create({
      data: {
        shortId,
        longUrl,
      },
    });

    return {
      shortId: newUrl.shortId,
      longUrl: newUrl.longUrl,
      shortUrl: `http://localhost:3000/${newUrl.shortId}`,
    };
  }

  async getOriginalUrl(shortId: string): Promise<string | null> {
    const urlMapping = await this.prisma.urlMapping.findUnique({
      where: { shortId },
    });

    if (!urlMapping) {
      return null;
    }

    // Zwiększamy licznik odwiedzin
    await this.prisma.urlMapping.update({
      where: { id: urlMapping.id },
      data: { visits: { increment: 1 } },
    });

    return urlMapping.longUrl;
  }

  async getAllUrls(): Promise<UrlMappingDto[]> {
    const urls = await this.prisma.urlMapping.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return urls.map((url) => ({
      id: url.id,
      shortId: url.shortId,
      longUrl: url.longUrl,
      shortUrl: `http://localhost:3000/${url.shortId}`,
      visits: url.visits,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
    }));
  }
}
