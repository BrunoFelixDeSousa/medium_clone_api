import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateArticlesTable1724696823644 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE articles (
              id SERIAL PRIMARY KEY,
              slug VARCHAR NOT NULL,
              title VARCHAR NOT NULL,
              description VARCHAR DEFAULT '',
              body VARCHAR DEFAULT '',
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              tag_list TEXT[] NOT NULL,
              favorites_count INT DEFAULT 0
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "articles"
        `);
  }
}
