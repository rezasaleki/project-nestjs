import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, BaseEntity } from "typeorm";
import { Photo } from "./photo.entity";

@Entity()
export class Author extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Photo, photo => photo.author) // note: we will create author property in the Photo class below
    photos: Photo[];
}