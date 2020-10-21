import { BaseEntity, BeforeInsert, BeforeUpdate, Column, PrimaryGeneratedColumn } from 'typeorm';



export class ExtendedBaseEntity extends BaseEntity {

    @Column({
        type: 'bigint',
        nullable: false,
        update: false,
        name: 'created_at',
    })
    createdAt: string;


    @Column({
        type: 'bigint',
        nullable: true,
        name: 'updated_at',
    })
    updatedAt: string;

    @Column({
        type: 'bigint',
        nullable: true,
        select: false,
        name: 'deleted_at',
    })
    deletedAt: number;

    @Column({
        type: 'bool',
        nullable: true,
        default: false,
        name: 'deleted',
    })
    deleted: boolean;

    @BeforeInsert()
    setCreatedTime() {
        this.createdAt = Date();
    }

    @BeforeUpdate()
    setUpdateTime() {
        this.updatedAt = Date();
    }


}

export class UUIDEntity extends ExtendedBaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
}

export class SerialIDEntity extends ExtendedBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
}
