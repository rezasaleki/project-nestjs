import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestsController } from './tests.controller';
import { TestsService } from './tests.service';

@Module({
    imports: [],
    controllers: [TestsController] ,
    providers: [TestsService]
})
export class TestsModule { }
