import { Injectable } from '@nestjs/common';
import { Prisma, type Role } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: DatabaseService) {}
  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return await this.prisma.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: Role) {
    return await this.prisma.employee.findMany({
      where: {
        role: role,
      },
    });
  }

  findOne = async (id: number) => {
    return await this.prisma.employee.findUnique({
      where: {
        id: id,
      },
    });
  };

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return await this.prisma.employee.update({
      where: {
        id: id,
      },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.employee.delete({
      where: {
        id: id,
      },
    });
  }
}
