import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John Doe', email: 'test@gmail.com', role: 'ADMIN' },
    { id: 2, name: 'Jane Smith', email: 'test2@gmail.com', role: 'ENGINEER' },
    { id: 3, name: 'Bob Johnson', email: 'test3@gmail.com', role: 'ENGINEER' },
    { id: 4, name: 'Alice Williams', email: 'test4@gmail.com', role: 'INTERN' },
  ];

  findAll(role?: 'ADMIN' | 'ENGINEER' | 'INTERN') {
    if (role) {
      return this.users.filter((user) => user.role == role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id == id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }

  findTowParams(id: number, email: string) {
    return this.users.find(
      (user) =>
        user.id == id && user.email.toLowerCase().includes(email.toLowerCase()),
    );
  }
  create(user: CreateUserDto) {
    if (!user.name || !user.email || !user.role) {
      throw new BadRequestException('Missing required fields');
    }
    const newUser = {
      id: this.users.length + 1,
      ...user,
    };
    const newUsers = [...this.users, newUser];
    return newUsers;
  }

  update(
    id: number,
    // user: Partial<{
    //   name: string;
    //   email: string;
    //   role: 'ADMIN' | 'ENGINEER' | 'INTERN';
    // }>,
    user: UpdateUserDTO,
  ) {
    const existingUser = this.users.find((u) => u.id == id);
    if (!existingUser || !id) {
      throw new BadRequestException('User not found');
    }
    Object.assign(existingUser, user);
    return existingUser;
  }

  delete(id: number) {
    const userIndex = this.users.findIndex((u) => u.id == id);
    if (userIndex == -1) {
      throw new Error('User not found');
    }
    this.users.splice(userIndex, 1);
    return { deleted: true };
  }
}
