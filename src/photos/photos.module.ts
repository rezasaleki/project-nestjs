import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoRepository } from './photo.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PhotoRepository])
  ],
  providers: [PhotosService],
  controllers: [PhotosController]
})
export class PhotosModule {}
