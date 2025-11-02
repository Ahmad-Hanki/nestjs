import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
@Controller('users') //domain/users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get() // GET users or /users?role=admin
  findAll(
    @Query('role') role?: string,
    @Query('age', ParseIntPipe) age?: number,
  ) {
    return this.usersService.findAll(role as 'ADMIN' | 'ENGINEER' | 'INTERN');
  }

  @Get('interns') // GET users/interns
  findAllInterns() {
    return [];
  }

  @Get(':id') // GET users/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    // ParseIntPipe to convert string to number, if not number, throw error 400
    return this.usersService.findOne(id);
  }
  @Get(':id/:email') // GET users/:id/:email
  findTowParams(
    @Param('id', ParseIntPipe) id: number,
    @Param('email') email: string,
  ) {
    return this.usersService.findTowParams(id, email);
  }

  @Post() // POST users
  create(@Body(ValidationPipe) user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Patch(':id') // PATCH users/:id
  update(
    @Body(ValidationPipe) user: UpdateUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.update(id, user);
  }

  @Delete(':id') // DELETE users/:id
  delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
