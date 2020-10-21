import {MigrationInterface, QueryRunner} from "typeorm";

export class tables1599121691013 implements MigrationInterface {
    name = 'tables1599121691013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "photo_metadata" ("id" SERIAL NOT NULL, "height" integer NOT NULL, "width" integer NOT NULL, "orientation" character varying NOT NULL, "compressed" boolean NOT NULL, "comment" character varying NOT NULL, "photo_id" integer, CONSTRAINT "REL_9981769b3e6c797e82b566ebab" UNIQUE ("photo_id"), CONSTRAINT "PK_da29f04585dc190eb00e4d73420" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "author" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "photo" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "filename" character varying NOT NULL, "view" integer NOT NULL, "isPublished" boolean NOT NULL, "authorId" integer, CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "asset" ("created_at" bigint NOT NULL, "updated_at" bigint, "deleted_at" bigint, "deleted" boolean DEFAULT false, "id" SERIAL NOT NULL, "filename" character varying NOT NULL, "quality" integer NOT NULL, "size" integer NOT NULL, "path" character varying NOT NULL, CONSTRAINT "PK_1209d107fe21482beaea51b745e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "drill" ("id" SERIAL NOT NULL, "asset_image_id" integer NOT NULL, "asset_video_id" integer NOT NULL, CONSTRAINT "PK_66c24774414aa39260e1c6c286f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "asset_audio" ("id" SERIAL NOT NULL, "offset" integer NOT NULL, "type" character varying NOT NULL, "name" character varying NOT NULL, "drillId" integer, "assetId" integer, CONSTRAINT "PK_e69be17aaed3a3121b6fe09aab0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workout" ("id" SERIAL NOT NULL, "asset_image_land_id" integer NOT NULL, "asset_image_id" integer NOT NULL, "asset_audio_intro_id" integer NOT NULL, "asset_audio_autro_id" integer NOT NULL, CONSTRAINT "PK_ea37ec052825688082b19f0d939" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album_photos_photo" ("albumId" integer NOT NULL, "photoId" integer NOT NULL, CONSTRAINT "PK_d6508e57e194669e6b77bee307d" PRIMARY KEY ("albumId", "photoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fb5deea2817dea41af76b11fd1" ON "album_photos_photo" ("albumId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d292b18c5fbb585c8ddb959ea8" ON "album_photos_photo" ("photoId") `);
        await queryRunner.query(`ALTER TABLE "photo_metadata" ADD CONSTRAINT "FK_9981769b3e6c797e82b566ebab6" FOREIGN KEY ("photo_id") REFERENCES "photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "FK_c073d197b41cfbeb09835ca233c" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "asset_audio" ADD CONSTRAINT "FK_beede4d48363dc48764823cf0cb" FOREIGN KEY ("drillId") REFERENCES "drill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "asset_audio" ADD CONSTRAINT "FK_c7b6ef63e9383ce41daffa37bed" FOREIGN KEY ("assetId") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "album_photos_photo" ADD CONSTRAINT "FK_fb5deea2817dea41af76b11fd15" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "album_photos_photo" ADD CONSTRAINT "FK_d292b18c5fbb585c8ddb959ea81" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album_photos_photo" DROP CONSTRAINT "FK_d292b18c5fbb585c8ddb959ea81"`);
        await queryRunner.query(`ALTER TABLE "album_photos_photo" DROP CONSTRAINT "FK_fb5deea2817dea41af76b11fd15"`);
        await queryRunner.query(`ALTER TABLE "asset_audio" DROP CONSTRAINT "FK_c7b6ef63e9383ce41daffa37bed"`);
        await queryRunner.query(`ALTER TABLE "asset_audio" DROP CONSTRAINT "FK_beede4d48363dc48764823cf0cb"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "FK_c073d197b41cfbeb09835ca233c"`);
        await queryRunner.query(`ALTER TABLE "photo_metadata" DROP CONSTRAINT "FK_9981769b3e6c797e82b566ebab6"`);
        await queryRunner.query(`DROP INDEX "IDX_d292b18c5fbb585c8ddb959ea8"`);
        await queryRunner.query(`DROP INDEX "IDX_fb5deea2817dea41af76b11fd1"`);
        await queryRunner.query(`DROP TABLE "album_photos_photo"`);
        await queryRunner.query(`DROP TABLE "workout"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "asset_audio"`);
        await queryRunner.query(`DROP TABLE "drill"`);
        await queryRunner.query(`DROP TABLE "asset"`);
        await queryRunner.query(`DROP TABLE "album"`);
        await queryRunner.query(`DROP TABLE "photo"`);
        await queryRunner.query(`DROP TABLE "author"`);
        await queryRunner.query(`DROP TABLE "photo_metadata"`);
    }

}
