import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column, BaseEntity, ManyToOne, ManyToMany, OneToMany } from "typeorm";
import { Drill } from "./drill.entity";
import { AssetAudio } from "./asset.audio.entity";
import { Workout } from "./workout.entity";
import { ExtendedBaseEntity } from "./extendedBase.entity";

@Entity()
export class Asset extends ExtendedBaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    filename: string;

    @Column('int4')
    quality:number;

    @Column()
    size: number;

   @Column()
    path:string;

    @OneToMany(type => AssetAudio, assetaudio => assetaudio.asset)
    assetAudios: AssetAudio[];

}



