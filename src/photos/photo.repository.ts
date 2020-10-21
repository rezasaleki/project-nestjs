import { Photo } from "src/Entity/photo.entity";
import { Repository, EntityRepository } from "typeorm";
import { CreatePhotoDto } from "./dto/create-photo.dto";
import { Catch } from "@nestjs/common";
import { PhotoMetadata } from "src/Entity/photo.metadata.entity";
import { Album } from "src/Entity/album.entity";
import { Author } from "src/Entity/author.entity";


@EntityRepository(Photo)
export class PhotoRepository extends Repository<Photo> {


    async getAllPhotos(): Promise<Photo[]> {
        // const photos = this.find();
        const photos = await this.find({ relations: ["metadata"] });

        /*...*/
        // let photos = createQueryBuilder("photo")
        //     .innerJoinAndSelect("photo.metadata", "metadata")
        //     .getMany();

        return photos;
    }

    async createAlbum(name:string):Promise<void> {

        // create a few albums
        const album1 = new Album();
        album1.name = name;
        await album1.save();

        const author = new Author();
        author.name = "rezasaleki"
        await author.save();

        const photo = new Photo();
        photo.name = "Me and Bears";
        photo.description = "I am near polar bears";
        photo.filename = "photo-with-bears.jpg";
        photo.view = 0;
        photo.isPublished = false;
        photo.author = author;
        photo.albums = [album1];

        try{
            await photo.save();
        }catch(error){
            console.log(error);
        }


    }

    async createPhoto (createPhotoDto : CreatePhotoDto): Promise<Photo> {

        const {name , description , filename} = createPhotoDto;

        const photo = new Photo();

        const photoMetadata = new PhotoMetadata();

        // let allPublishedPhotos = await this.find({ isPublished: true });
        // let meAndBearsPhoto = await photoRepository.findOne({ name: "Me and Bears" });

        photo.name = name;
        photo.description = description;
        photo.filename = filename;
        photo.view = 0;
        photo.isPublished = false;

        photoMetadata.height = 200;
        photoMetadata.width = 300;
        photoMetadata.compressed = true;
        photoMetadata.comment = "cybershoot";
        photoMetadata.orientation = "portrait";
        photoMetadata.photo = photo;

        photo.metadata = photoMetadata; // this way we connect them

        try {
            await photo.save();
            console.log("Photo is saved, photo metadata is saved too.")

        }catch(error){
            console.log(error);
        }


        // try {
        //     photo.save();
        //     photoMetadata.save();
        //     console.log("Metadata is saved, and relation between metadata and photo is created in the database too");
        // } catch (error){
        //     console.log(error);
        // };
        return photo;
    }

    async getAll (): Promise<any> {
        const photos = this.findOne(4, { relations: ["albums"] });
        return photos;
    }

}
