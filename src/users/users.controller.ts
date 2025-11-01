import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users') //domain/users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get() // GET users or /users?role=admin
  findAll(@Query('role') role?: string) {
    return this.usersService.findAll(role as 'ADMIN' | 'ENGINEER' | 'INTERN');
  }

  @Get('interns') // GET users/interns
  findAllInterns() {
    return [];
  }

  @Get(':id') // GET users/:id
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
  @Get(':id/:email') // GET users/:id/:email
  findTowParams(@Param('id') id: string, @Param('email') email: string) {
    return this.usersService.findTowParams(+id, email);
  }

  @Post() // POST users
  create(@Body() user: {}) {
    return this.usersService.create(
      user as {
        name: string;
        email: string;
        role: 'ADMIN' | 'ENGINEER' | 'INTERN';
      },
    );
  }

  @Patch(':id') // PATCH users/:id
  update(@Body() user: {}, @Param('id') id: string) {
    return this.usersService.update(
      +id,
      user as Partial<{
        name: string;
        email: string;
        role: 'ADMIN' | 'ENGINEER' | 'INTERN';
      }>,
    );
  }

  @Delete(':id') // DELETE users/:id
  delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
