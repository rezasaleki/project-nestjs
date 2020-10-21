import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotoRepository } from './photo.repository';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from 'src/Entity/photo.entity';

@Injectable()
export class PhotosService {
    constructor(@InjectRepository(PhotoRepository) private photoRepository: PhotoRepository){}

    async createPhotoDto(createPhotoDto: CreatePhotoDto): Promise<Photo> {

        return this.photoRepository.createPhoto(createPhotoDto);
    }

    async getAllPhotos(): Promise<Photo[]> {
        return this.photoRepository.getAllPhotos();
    }

    async createAlbum(name: string): Promise<void> {
        return this.photoRepository.createAlbum(name);
    }

    async getAll(): Promise<any> {
        return this.photoRepository.getAll();
    }

}
