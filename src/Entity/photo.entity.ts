import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column, BaseEntity, ManyToOne, ManyToMany } from "typeorm";
import { PhotoMetadata } from "./photo.metadata.entity";
import { Author } from "./author.entity";
import { Album } from "./album.entity";


@Entity()
export class Photo extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name:string

    @Column()
    description:string

    @Column()
    filename:string

    @Column()
    view:number

    @Column()
    isPublished:boolean;

    @OneToOne(type => PhotoMetadata, photoMetadata => photoMetadata.photo , {
        cascade: true,
    })
    metadata: PhotoMetadata;

    @ManyToOne(type => Author, author => author.photos)
    author: Author;

    @ManyToMany(type => Album, album => album.photos)
    albums: Album[];

}



