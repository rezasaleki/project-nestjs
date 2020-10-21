import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Test } from '@nestjs/testing';


// const moduleRef = await Test.createTestingModule({
//   controllers: [CatsController],
//   providers: [CatsService]
// }).compile();

// catsService = await moduleRef.resolve(CatsService);


@Module({
  controllers: [CatsController],
  providers: [CatsService]
})
export class CatsModule {}
