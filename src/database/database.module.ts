import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService], // if you want to make it available outside this module
  controllers: [], // http 
  imports: [], // add any modules that DatabaseModule depends on
})
export class DatabaseModule {}
