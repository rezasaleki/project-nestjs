import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, IsNull, OneToMany } from "typeorm";
import { AssetAudio } from "./asset.audio.entity";


@Entity()
export class Drill extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    asset_image_id: number;

    @Column()
    asset_video_id: number;

    @OneToMany(type => AssetAudio, assetAudio => assetAudio.drill) // note: we will create author property in the Photo class below
    audios: AssetAudio[];


}