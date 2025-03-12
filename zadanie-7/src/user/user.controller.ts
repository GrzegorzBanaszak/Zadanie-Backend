import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Utwórz nowego użytkownika' })
  @ApiResponse({
    status: 201,
    description: 'Użytkownik został pomyślnie utworzony.',
    type: UserEntity,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Pobierz wszystkich użytkowników' })
  @ApiResponse({
    status: 200,
    description: 'Lista wszystkich użytkowników.',
    type: [UserEntity],
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz użytkownika po ID' })
  @ApiResponse({
    status: 200,
    description: 'Dane użytkownika.',
    type: UserEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Użytkownik nie został znaleziony.',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Aktualizuj dane użytkownika' })
  @ApiResponse({
    status: 200,
    description: 'Dane użytkownika zostały zaktualizowane.',
    type: UserEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Użytkownik nie został znaleziony.',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Usuń użytkownika' })
  @ApiResponse({
    status: 200,
    description: 'Użytkownik został usunięty.',
    type: UserEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Użytkownik nie został znaleziony.',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
