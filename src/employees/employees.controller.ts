import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { type Employee, Prisma, type Role } from '@prisma/client';
import { EmployeesService } from './employees.service';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
@SkipThrottle() // skip the rate limiter
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }

  @SkipThrottle({ default: false }) // enable rate limiting for this route
  @Get()
  findAll(@Query() role?: Role): Promise<Employee[]> {
    return this.employeesService.findAll(role);
  }

  @Throttle({
    short: {
      ttl: 60, // 1 minute
      limit: 5, // 5 requests
    },
  }) // 5 requests per minute
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Employee | null> {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput,
  ) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
