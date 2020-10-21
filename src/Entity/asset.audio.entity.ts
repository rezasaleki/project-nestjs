import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, IsNull, ManyToOne } from "typeorm";
import { Asset } from "./asset.entity";
import { Drill } from "./drill.entity";


@Entity()
export class AssetAudio extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    offset: number;

    @Column()
    type: string;

    @Column()
    name: string;

    @ManyToOne(type => Drill, drill => drill.audios)
    drill: AssetAudio;

    @ManyToOne(type => Asset, asset => asset.assetAudios)
    asset: Asset;
}