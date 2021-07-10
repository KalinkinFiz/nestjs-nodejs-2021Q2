import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Board1624143596090 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'boards',
        columns: [
          {
            name: 'id',
            generationStrategy: 'uuid',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varChar',
          },
          {
            name: 'columns',
            type: 'jsonb',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('boards');
  }
}
