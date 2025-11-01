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

@Controller('users') //domain/users
export class UsersController {
  @Get() // GET users or /users?role=admin
  findAll(@Query('role') role? : string) {
    return [];
  }

  @Get('interns') // GET users/interns
  findAllInterns() {
    return [];
  }

  @Get(':id') // GET users/:id
  findOne(@Param('id') id: string) {
    return { id };
  }
  @Get(':id/:slug') // GET users/:id/:slug
  findTowParams(@Param('id') id: string, @Param('slug') slug: string) {
    return { id, slug };
  }

  @Post() // POST users
  create(@Body() user: {}) {
    return user;
  }

  @Patch(':id') // PATCH users/:id
  update(@Body() user: {}, @Param('id') id: string) {
    return { id, ...user };
  }

  @Delete(':id') // DELETE users/:id
  delete(@Param('id') id: string) {
    return { deleted: true };
  }
}
