// validation types for creating a user

import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;
  @IsEmail(
    {},
    {
      message: 'Invalid email format',
    },
  )
  email: string;

  @IsEnum(['ADMIN', 'ENGINEER', 'INTERN'], {
    message: 'role must be either ADMIN, ENGINEER, or INTERN',
  })
  role: 'ADMIN' | 'ENGINEER' | 'INTERN';
}
