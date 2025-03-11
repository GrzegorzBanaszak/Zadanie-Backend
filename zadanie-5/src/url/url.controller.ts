import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { UrlService } from './url.service';
import { ShortenUrlDto } from './dto/shorten-url.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UrlResponseDto } from './dto/url-response.dto';
import { UrlMappingDto } from './dto/url-mapping.dto';

@ApiTags('URL Shortener')
@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  @ApiOperation({
    summary: 'Skróć URL',
    description: 'Tworzy skrócony link dla podanego URL',
  })
  @ApiResponse({
    status: 201,
    description: 'URL został pomyślnie skrócony',
    type: UrlResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Nieprawidłowy URL' })
  async shortenUrl(
    @Body() shortenUrlDto: ShortenUrlDto,
  ): Promise<UrlResponseDto> {
    return this.urlService.shortenUrl(shortenUrlDto.longUrl);
  }

  @Get(':shortId')
  @ApiOperation({
    summary: 'Przekieruj na oryginalny URL',
    description: 'Przekierowuje użytkownika na oryginalny długi URL',
  })
  @ApiParam({
    name: 'shortId',
    description: 'Krótki identyfikator URL',
    example: 'Abc12345',
  })
  @ApiResponse({ status: 302, description: 'Przekierowanie na oryginalny URL' })
  @ApiResponse({ status: 404, description: 'Nie znaleziono skróconego URL' })
  async redirectToOriginalUrl(
    @Param('shortId') shortId: string,
    @Res() res: Response,
  ) {
    const originalUrl = await this.urlService.getOriginalUrl(shortId);

    if (!originalUrl) {
      throw new NotFoundException('Short URL not found');
    }

    return res.redirect(originalUrl);
  }

  @Get('api/urls')
  @ApiOperation({
    summary: 'Pobierz wszystkie URL-e',
    description: 'Zwraca listę wszystkich skróconych URL-i w systemie',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista wszystkich URL-i',
    type: [UrlMappingDto],
  })
  async getAllUrls(): Promise<UrlMappingDto[]> {
    return this.urlService.getAllUrls();
  }
}
