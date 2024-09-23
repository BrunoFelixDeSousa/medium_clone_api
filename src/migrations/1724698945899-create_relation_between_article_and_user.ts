import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateRelationBetweenArticleAndUser1724698945899
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "articles"
            ADD COLUMN "author_id" uuid;
        `)

    await queryRunner.query(`
            ALTER TABLE "articles"
            ADD CONSTRAINT fk_user
            FOREIGN KEY (author_id)
            REFERENCES users(id)
            ON DELETE SET NULL;
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "articles"
            DROP CONSTRAINT fk_user;
        `)

    await queryRunner.query(`
            ALTER TABLE "articles"
            DROP COLUMN "author_id";
        `)
  }
}
