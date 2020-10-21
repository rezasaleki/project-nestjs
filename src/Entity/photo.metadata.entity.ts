import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, BaseEntity } from "typeorm";
import { Photo } from "./photo.entity";

@Entity()
export class PhotoMetadata extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number

    @Column("int")
    height: number;

    @Column("int")
    width: number;

    @Column()
    orientation: string;

    @Column()
    compressed: boolean;

    @Column()
    comment: string;

    @OneToOne(type => Photo ,photo => photo.metadata)
    @JoinColumn({name : 'photo_id'})
    photo: Photo;

}