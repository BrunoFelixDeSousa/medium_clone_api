import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUsessTable1724607006561 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
                "username" varchar NOT NULL,
                "email" varchar NOT NULL,
                "password" varchar NOT NULL,
                "bio" varchar DEFAULT ''::character varying NOT NULL,
                "image" varchar DEFAULT ''::character varying NOT NULL,
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id),
                CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE (username)
                );
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "users"
        `)
  }
}
