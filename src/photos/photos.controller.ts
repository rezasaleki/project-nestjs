import { Controller, Post, Get, All, Body, ValidationPipe } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from 'src/Entity/photo.entity';

@Controller('photos')
export class PhotosController {
    constructor(private photosService: PhotosService){}

    @Get()
    getAllPhotos(): Promise<Photo[]> {
        return this.photosService.getAllPhotos();
    }

    @Post()
    createPhotoDto(@Body(ValidationPipe)createPhotoDto : CreatePhotoDto): Promise<Photo> {
        return this.photosService.createPhotoDto(createPhotoDto);
    }

    @Post('store')
    createAlbum(@Body('name') name:string): Promise<any> {
        return this.photosService.createAlbum(name);
    }

    @Get('albums')
    async getAll(): Promise<any> {
        return this.photosService.getAll();
    }
}
