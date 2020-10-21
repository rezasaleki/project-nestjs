import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, IsNull, OneToMany, ManyToOne } from "typeorm";
import { Asset } from "./asset.entity";


@Entity()
export class Workout extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    asset_image_land_id:number;

    @Column()
    asset_image_id:number;

    @Column()
    asset_audio_intro_id:number;

    @Column()
    asset_audio_autro_id:number;



}